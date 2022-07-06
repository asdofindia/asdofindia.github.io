---
layout: post
title: "Exploring Frappe"
tags:
  - code
---

##### I wanted to understand how Frappe/ERPNext works. So I went through the codebase. #####

Firstly, I will describe how I set up the development setup.

Frappe needs mysql root user password. I don't even know what that password is. So, instead, I used a mariadb docker like this:

```
docker run --name mysql -p 12345:3306 -e MARIADB_ROOT_PASSWORD=frappe -d mariadb:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

The character set stuff is required because frappe fails with the default character set.

As can be seen, the port is now 12345 and the password is conveniently frappe.

The new-site command needs to take these parameters too. (db-host is likely unnecessary I haven't verified)

```
bench new-site localhost --db-host 0.0.0.0 --db-port 12345
```

There we have a fresh frappe.

## Approach

I had explored the UI of Frappe and documentation earlier. It is rather intuitive. But as a programmer, it is very difficult for me to work with something that's magic. So, the approach I am taking today is following the source code to figure out what exactly is happening.

To make sure I have all relevant source code, I downloaded bench, frappe, and erpnext from github.com/frappe

## bench start

This is the command that runs frappe. So this must be a good place to explore. Searching for "start" leads one to `bench/utils/system.py` where [these lines](https://github.com/frappe/bench/blob/beac8651532db2ec8a55aa9d931b0cf3bde1ef25/bench/utils/system.py#L144-L167) seem relevant:

```py
def start(no_dev=False, concurrency=None, procfile=None, no_prefix=False, procman=None):
	if procman:
		program = which(procman)
	else:
		program = get_process_manager()

	if not program:
		raise Exception("No process manager found")

	os.environ["PYTHONUNBUFFERED"] = "true"
	if not no_dev:
		os.environ["DEV_SERVER"] = "true"

	command = [program, "start"]
	if concurrency:
		command.extend(["-c", concurrency])

	if procfile:
		command.extend(["-f", procfile])

	if no_prefix:
		command.extend(["--no-prefix"])

	os.execv(program, command)
```

So, it is `$program start` that typically happens when running `bench start`. Which $program (process manager) to use can be passed in via commandline, or by default it will try get_process_manager() which [will look for](https://github.com/frappe/bench/blob/beac8651532db2ec8a55aa9d931b0cf3bde1ef25/bench/utils/__init__.py#L193-L197):

```py
def get_process_manager() -> str:
	for proc_man in ["honcho", "foreman", "forego"]:
		proc_man_path = which(proc_man)
		if proc_man_path:
			return proc_man_path
```

## Honcho

By default, [honcho](https://honcho.readthedocs.io/en/latest/) seems to be installed by bench.

Honcho helps run Procfile-based applications. What's Procfile? Procfile is a simple text file that works much like Makefile where a task is given a name and a command (also like npm's scripts). It probably became popular with Heroku because that's where I saw it used most.

[Aside: If you know whether Heroku created Procfile or just adopted Procfile, let me know]

Basically, bench had created a Procfile (at the root of wherever we created bench stuff), here's what it looks like:

```Procfile
redis_cache: redis-server config/redis_cache.conf
redis_socketio: redis-server config/redis_socketio.conf
redis_queue: redis-server config/redis_queue.conf

web: bench serve --port 8000

socketio: /usr/bin/node apps/frappe/socketio.js

watch: bench watch

schedule: bench schedule
worker_short: bench worker --queue short 1>> logs/worker.log 2>> logs/worker.error.log
worker_long: bench worker --queue long 1>> logs/worker.log 2>> logs/worker.error.log
worker_default: bench worker --queue default 1>> logs/worker.log 2>> logs/worker.error.log
```

`honcho start` just [starts all of these at once](https://honcho.readthedocs.io/en/latest/index.html?highlight=start#what-are-procfiles)! (Try doing that with your npm scripts)

Among these, the redis ones and the worker ones seem irrelevant to us at the moment.

What we're going to look next at is the `web` script which does `bench serve`.

## bench serve

The [bench documentation](https://github.com/frappe/bench/blob/beac8651532db2ec8a55aa9d931b0cf3bde1ef25/docs/bench_usage.md) does mention how not all commands that bench supports comes from bench itself. This holds true for `serve`. There's no mention of `serve` in the bench source code. So where does that come from?

The `cli.py` [calls](https://github.com/frappe/bench/blob/beac8651532db2ec8a55aa9d931b0cf3bde1ef25/bench/cli.py#L195-L199) `get_frappe_commands` which calls `generate_command_cache` which [calls](https://github.com/frappe/bench/blob/beac8651532db2ec8a55aa9d931b0cf3bde1ef25/bench/utils/__init__.py#L383-L407) `get_frappe_commands` from `frappe.util.bench_helper` (cross-package magic!).

That [eventually hooks into](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/utils/bench_helper.py#L66-L81) the `commands.py` file (or `commands/__init__.py`) in every app.

In our case, it is [frappe's own commands](https://github.com/frappe/frappe/tree/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/commands) folder that is interesting. It [calls](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/commands/__init__.py#L107-L124) neighbouring files, and the [utils.py there includes](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/commands/utils.py#L897-L903) our serve command.

It eventually [calls](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/commands/utils.py#L926-L933) `frappe.app.serve` [which is](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/app.py#L319):

```py
def serve(
	port=8000, profile=False, no_reload=False, no_threading=False, site=None, sites_path="."
):
	global application, _site, _sites_path
	_site = site
	_sites_path = sites_path

	from werkzeug.serving import run_simple

	if profile or os.environ.get("USE_PROFILER"):
		application = ProfilerMiddleware(application, sort_by=("cumtime", "calls"))

	if not os.environ.get("NO_STATICS"):
		application = SharedDataMiddleware(
			application, {"/assets": str(os.path.join(sites_path, "assets"))}
		)

		application = StaticDataMiddleware(application, {"/files": str(os.path.abspath(sites_path))})

	application.debug = True
	application.config = {"SERVER_NAME": "localhost:8000"}

	log = logging.getLogger("werkzeug")
	log.propagate = False

	in_test_env = os.environ.get("CI")
	if in_test_env:
		log.setLevel(logging.ERROR)

	run_simple(
		"0.0.0.0",
		int(port),
		application,
		use_reloader=False if in_test_env else not no_reload,
		use_debugger=not in_test_env,
		use_evalex=not in_test_env,
		threaded=not no_threading,
	)
```

So, it is [werkzeug](https://werkzeug.palletsprojects.com/) which eventually serves frappe sites.

## Werkzeug

Werkzeug is a web backend library in python. (Something like express in nodejs).

Werkzeug expects the "application" to be a WSGI application. Apparently python has [standardized how WSGI works](https://peps.python.org/pep-3333/#the-application-framework-side). (We are in [Java world](../java-web/) now! :D). On reading WSGI's PEP, you'll see that it sounds a lot like an express middleware.

> The application object is simply a callable object that accepts two arguments

> ```py
> HELLO_WORLD = b"Hello world!\n"
> 
> def simple_app(environ, start_response):
>     """Simplest possible application object"""
>     status = '200 OK'
>     response_headers = [('Content-type', 'text/plain')]
>     start_response(status, response_headers)
>     return [HELLO_WORLD]
> ```

The usage of `environ` is not clear in this snippet, but it is just like the Request parameter that express middleware receives. And that start_response is similar to the Response parameter.

## application

[This is where](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/app.py#L47-L48) where frappe uses a lot of werkzeug magic to be able to convert this to a [JAX-RS style](../java-web/) "a function that takes a request and returns a response" function.

```py
@Request.application
def application(request):
```

At this point, frappe [attaches this request to various handlers](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/app.py#L64-L77):

```py
        elif frappe.form_dict.cmd:
			response = frappe.handler.handle()

		elif request.path.startswith("/api/"):
			response = frappe.api.handle()

		elif request.path.startswith("/backups"):
			response = frappe.utils.response.download_backup(request.path)

		elif request.path.startswith("/private/files/"):
			response = frappe.utils.response.download_private_file(request.path)

		elif request.method in ("GET", "HEAD", "POST"):
			response = get_response()
```

## cmd handle

The [first of these handlers](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/handler.py#L38-L56) seems to respond to the parameter "cmd" specified by incoming requests.

```py
def handle():
	"""handle request"""

	cmd = frappe.local.form_dict.cmd
	data = None

	if cmd != "login":
		data = execute_cmd(cmd)

	# data can be an empty string or list which are valid responses
	if data is not None:
		if isinstance(data, Response):
			# method returns a response object, pass it on
			return data

		# add the response to `message` label
		frappe.response["message"] = data

	return build_response("json")

```

We can see this being utilized in [frappeclient.py](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/frappeclient.py#L98-L107)

```py
	def logout(self):
		"""Logout session"""
		self.session.get(
			self.url,
			params={
				"cmd": "logout",
			},
			verify=self.verify,
			headers=self.headers,
		)
```

## api handle

Looking at the [docstring of this](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/api.py#L16-L38), this seems to be a very important handler.

```py
def handle():
	"""
	Handler for `/api` methods

	### Examples:

	`/api/method/{methodname}` will call a whitelisted method

	`/api/resource/{doctype}` will query a table
	        examples:
	        - `?fields=["name", "owner"]`
	        - `?filters=[["Task", "name", "like", "%005"]]`
	        - `?limit_start=0`
	        - `?limit_page_length=20`

	`/api/resource/{doctype}/{name}` will point to a resource
	        `GET` will return doclist
	        `POST` will insert
	        `PUT` will update
	        `DELETE` will delete

	`/api/resource/{doctype}/{name}?run_method={method}` will run a whitelisted controller method
	"""
```

Then it splits the URL:

```py
	parts = frappe.request.path[1:].split("/", 3)
	call = doctype = name = None

	if len(parts) > 1:
		call = parts[1]

	if len(parts) > 2:
		doctype = parts[2]

	if len(parts) > 3:
		name = parts[3]

```

First it handles [server scripts of the API type](https://frappeframework.com/docs/v14/user/en/desk/scripting/server-script#23-api-scripts).

```py
	if call == "method":
		frappe.local.form_dict.cmd = doctype
		return frappe.handler.handle()
```

We didn't completely look at handler.handle earlier. It calls an `execute_cmd` [which does this](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/handler.py#L59-L83)

```py
def execute_cmd(cmd, from_async=False):
	"""execute a request as python module"""
	for hook in frappe.get_hooks("override_whitelisted_methods", {}).get(cmd, []):
		# override using the first hook
		cmd = hook
		break

	# via server script
	server_script = get_server_script_map().get("_api", {}).get(cmd)
	if server_script:
		return run_server_script(server_script)

	try:
		method = get_attr(cmd)
	except Exception as e:
		frappe.throw(_("Failed to get method for command {0} with {1}").format(cmd, e))

	if from_async:
		method = method.queue

	if method != run_doc_method:
		is_whitelisted(method)
		is_valid_http_method(method)

	return frappe.call(method, **frappe.form_dict)
```

`run_server_script` is rather straightforward:

```py
def run_server_script(server_script):
	response = frappe.get_doc("Server Script", server_script).execute_method()

	# some server scripts return output using flags (empty dict by default),
	# while others directly modify frappe.response
	# return flags if not empty dict (this overwrites frappe.response.message)
	if response != {}:
		return response
```

That `execute_method` [eventually](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/core/doctype/server_script/server_script.py#L70-L90) calls `safe_exec` from [utils.safe_exec](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/utils/safe_exec.py).

## safe_exec

This one uses [RestrictedPython](https://pypi.org/project/RestrictedPython/) to compile the source code (of server script, etc) to allow only a set of allowed keywords.

RestrictedPython essentially makes safe whatever user-entered python code is being executed.

As far as I looked into the code, there doesn't seem to be a way to configure what globals are available or considered "safe". This possibly means that server scripting is meant to be used only for small things like validations. That we gotta build Frappe apps when we need more power. (Let me know if that's wrong).

## /api/resource

Coming back to our api handler, we can see that the other main kind of API calls are related to retrieving records from various doctypes (with filters, fields, etc). This is done by [these lines](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/api.py#L108-L127):

```py
			elif doctype:
				if frappe.local.request.method == "GET":
					# set fields for frappe.get_list
					if frappe.local.form_dict.get("fields"):
						frappe.local.form_dict["fields"] = json.loads(frappe.local.form_dict["fields"])

					# set limit of records for frappe.get_list
					frappe.local.form_dict.setdefault(
						"limit_page_length",
						frappe.local.form_dict.limit or frappe.local.form_dict.limit_page_length or 20,
					)

					# convert strings to native types - only as_dict and debug accept bool
					for param in ["as_dict", "debug"]:
						param_val = frappe.local.form_dict.get(param)
						if param_val is not None:
							frappe.local.form_dict[param] = sbool(param_val)

					# evaluate frappe.get_list
					data = frappe.call(frappe.client.get_list, doctype, **frappe.local.form_dict)

					# set frappe.get_list result to response
					frappe.local.response.update({"data": data})
```

So, this is where the filtering and querying happens.

The `frappe.client.get_list` method [calls](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/client.py#L63) `frappe.get_list` which [looks like this](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/__init__.py#L1832-L1855):

```py
def get_list(doctype, *args, **kwargs):
	"""List database query via `frappe.model.db_query`. Will also check for permissions.

	:param doctype: DocType on which query is to be made.
	:param fields: List of fields or `*`.
	:param filters: List of filters (see example).
	:param order_by: Order By e.g. `modified desc`.
	:param limit_start: Start results at record #. Default 0.
	:param limit_page_length: No of records in the page. Default 20.

	Example usage:

	        # simple dict filter
	        frappe.get_list("ToDo", fields=["name", "description"], filters = {"owner":"test@example.com"})

	        # filter as a list of lists
	        frappe.get_list("ToDo", fields="*", filters = [["modified", ">", "2014-01-01"]])

	        # filter as a list of dicts
	        frappe.get_list("ToDo", fields="*", filters = {"description": ("like", "test%")})
	"""
	import frappe.model.db_query

	return frappe.model.db_query.DatabaseQuery(doctype).execute(*args, **kwargs)
```

Essentially, we're now querying the database here. It eventually gets called [like this](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/model/db_query.py#L200-L217):

```py
		query = (
			"""select %(fields)s
			from %(tables)s
			%(conditions)s
			%(group_by)s
			%(order_by)s
			%(limit)s"""
			% args
		)

		return frappe.db.sql(
			query,
			as_dict=not self.as_list,
			debug=self.debug,
			update=self.update,
			ignore_ddl=self.ignore_ddl,
			run=self.run,
		)
```

`frappe.db.sql` is defined in a `frappe/database` directory which is full of SQL query logic. The mariadb part seems clean, but the postgresql part seems "experimental". I dare you to read through the [whole thing](https://github.com/frappe/frappe/tree/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/database).

## Where are we now?

We now know how API calls are handled by werkzeug to handlers that validate the request and eventually queries the database to give a response.

We still haven't seen how scheduling works.

## Scheduling

We go back to `Procfile` we can see this line:

```
schedule: bench schedule
```

This command is again [coming from frappe](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/commands/scheduler.py#L188-L192):


```py
@click.command("schedule")
def start_scheduler():
	from frappe.utils.scheduler import start_scheduler

	start_scheduler()
```

## start_scheduler

That [does this](https://github.com/frappe/frappe/blob/aed9d2260968b916efd85efb85a982bb6a5c3c2f/frappe/utils/scheduler.py#L36-L46):

```py

def start_scheduler():
	"""Run enqueue_events_for_all_sites every 2 minutes (default).
	Specify scheduler_interval in seconds in common_site_config.json"""

	schedule.every(frappe.get_conf().scheduler_tick_interval or 60).seconds.do(
		enqueue_events_for_all_sites
	)

	while True:
		schedule.run_pending()
		time.sleep(1)
```

Internally that calls the `schedule` [package in python](https://schedule.readthedocs.io/) which is "python job scheduling for humans"

## What now?

With this much exploration, frappe doesn't feel like magic anymore to me. And that was my objective. So, I'll stop this post for now. But [feel free to reach out](../about/#contact) if you think I should look at a different code path.