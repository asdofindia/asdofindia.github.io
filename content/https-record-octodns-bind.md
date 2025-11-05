+++
date = '2025-11-05T08:55:06+05:30'
title = 'HTTPS SVCB Record in OctoDNS with Bind'
type = 'post'
tags = ['sysadmin']
+++

##### Heard about HTTPS record and want to set it in OctoDNS. You can now! #####

SVCB is a new type of DNS record that's like CNAME but with more powers. It is defined in the [Service Binding and Parameter Specification via the DNS RFC](https://datatracker.ietf.org/doc/rfc9460/). HTTPS record is a specifically named variant of SVCB record.

```dns
   @ 7200 IN HTTPS 1 . alpn=h3
```

A record like this makes the apex domain (@) be marked as supporting QUIC and HTTP/3 and therefore clients can choose to directly start the network calls needed for that. Without this record, the client would traditionally have to visit the server once with a regular HTTP 1.1 request, and then get upgraded to HTTP/3 taking an extra roundtrip.

Another option is to have an alias.

```dns
   example.com. 3600 IN HTTPS 0 svc.example.net.
```

Here, example.com is considered to be aliased to svc.example.net exactly like how the following CNAME record would work

```dns
   www.example.com. 3600 IN CNAME svc.example.net.
```

Note that putting example.com. for CNAME cannot work.

```dns
   ; Invalid
   example.com. 3600 IN CNAME svc.example.net.
```

Firefox [supports](https://www.firefox.com/en-US/firefox/129.0/releasenotes/) using this record. There is [experimental support](https://daniel.haxx.se/blog/2025/03/31/https-rr-in-curl/) in curl, and so on.

## OctoDNS

OctoDNS is the DNS as code configuration tool that I use to maintain my DNS configurations in YAML on my computer and synchronize it my Bind9 DNS server.

OctoDNS had added support for SVCB and HTTPS RR in [mid-2024](https://github.com/octodns/octodns/commit/f02f94e4ad8cee7dee0f96580cb5c0cd15f26fa4).

I tried looking at the code to figure out how to configure it and arrived at the following configuration:

```yaml
  - ttl: 3600
    type: HTTPS
    values:
    - svcparams:
        alpn:
        - h3
        - h2
      svcpriority: 1
      targetname: .
```

While trying to synchronize, I got an error that it was not supported by the bind provider.

But when I looked at the implementation of the provider, it was simply delegating the functionality to other libraries (or core octodns). Therefore, all that had to be done was add the record names to a [list](https://github.com/octodns/octodns-bind/blob/724b45392dc93079d05b5117795016551729a184/octodns_bind/__init__.py#L43-L63). I monkey patched my venv and tried it out. It worked fine and created the changes in my bind9 zone file.

So, I [submitted the change to octodns-bind](https://github.com/octodns/octodns-bind/pull/93). Another contributor suggested me to add unit test for parsing which I did and also added a changelog entry.

It was soon merged. But it is as of yet not released.

So, to get the latest code from github you might want to do:

```bash
pip install git+https://git@github.com/octodns/octodns-bind.git#egg=octodns_bind
```

Afterwards you can add YAML as above and sync.
