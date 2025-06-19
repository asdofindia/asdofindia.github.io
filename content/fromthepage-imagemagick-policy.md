+++
type = 'post'
title = '[SOLVED] FromThePage upload stuck in processing'
tags = ['how-to']
date = '2024-07-21'
+++

Manoj messaged me the other day saying how he was unable to upload a file to the "FromThePage" instance of Sahya. I started investigating it after 4 days.

I couldn't find any error in the application log. And then Manoj told me that the uploads were indeed complete, but they were stuck in "Processing" in the queue. So I went and looked at the log of one, and it was like this:

```
** Invoke fromthepage:process_document_upload (first_time)
** Invoke environment (first_time)
** Execute environment
** Execute fromthepage:process_document_upload
fetching upload with ID=19
found document_upload for 
	user=Manojk, 
	target collection=KNH, 
	file=/uploads/document_upload/file/19/KNH000004.pdf
creating temp directory /tmp/fromthepage_uploads/19
copying /var/www/fromthepage/public/uploads/document_upload/file/19/* to /tmp/fromthepage_uploads/19
unzip_tree(/tmp/fromthepage_uploads/19)
	unzip_tree considering /tmp/fromthepage_uploads/19/KNH000004.pdf
	unzip_tree considering /tmp/fromthepage_uploads/19/process.log
unpdf_tree(/tmp/fromthepage_uploads/19)
	unpdf_tree considering /tmp/fromthepage_uploads/19/KNH000004.pdf)
		unpdf_tree Found pdf /tmp/fromthepage_uploads/19/KNH000004.pdf
		gs -r300x300 -dJPEGQ=30 -o '/tmp/fromthepage_uploads/19/KNH000004/page_%04d.jpg' -sDEVICE=jpeg '/tmp/fromthepage_uploads/19/KNH000004.pdf'
GPL Ghostscript 9.55.0 (2021-09-27)
Copyright (C) 2021 Artifex Software, Inc.  All rights reserved.
This software is supplied under the GNU AGPLv3 and comes with NO WARRANTY:
see the file COPYING for details.
Processing pages 1 through 2.
Page 1
Page 2
		unpdf_tree Extracted to /tmp/fromthepage_uploads/19/KNH000004
		unpdf_tree No metadata file exists at /tmp/fromthepage_uploads/19/metadata.yml
	unpdf_tree considering /tmp/fromthepage_uploads/19/process.log)
convert tiffs from tree(/tmp/fromthepage_uploads/19)
	untiff_tree considering /tmp/fromthepage_uploads/19/KNH000004)
Found directory /tmp/fromthepage_uploads/19/KNH000004
convert tiffs from tree(/tmp/fromthepage_uploads/19/KNH000004)
	untiff_tree considering /tmp/fromthepage_uploads/19/KNH000004/page_0001.jpg)
	untiff_tree considering /tmp/fromthepage_uploads/19/KNH000004/page_0002.jpg)
	untiff_tree considering /tmp/fromthepage_uploads/19/KNH000004.pdf)
	untiff_tree considering /tmp/fromthepage_uploads/19/process.log)
compress tree(/tmp/fromthepage_uploads/19)
compress_tree handling /tmp/fromthepage_uploads/19/KNH000004)
Found directory /tmp/fromthepage_uploads/19/KNH000004
compress tree(/tmp/fromthepage_uploads/19/KNH000004)
compress_tree handling /tmp/fromthepage_uploads/19/KNH000004/page_0001.jpg)
Found image /tmp/fromthepage_uploads/19/KNH000004/page_0001.jpg
/var/www/fromthepage/lib/image_helper.rb:81: warning: passing a block without an image argument is deprecated
"Compressed file is now 12884403 at quality 90"
/var/www/fromthepage/lib/image_helper.rb:81: warning: passing a block without an image argument is deprecated
"Compressed file is now 10553270 at quality 80"
/var/www/fromthepage/lib/image_helper.rb:81: warning: passing a block without an image argument is deprecated
"Compressed file is now 8526727 at quality 70"
/var/www/fromthepage/lib/image_helper.rb:81: warning: passing a block without an image argument is deprecated
"Compressed file is now 8201708 at quality 60"
/var/www/fromthepage/lib/image_helper.rb:81: warning: passing a block without an image argument is deprecated
"Compressed file is now 7735076 at quality 50"
/var/www/fromthepage/lib/image_helper.rb:81: warning: passing a block without an image argument is deprecated
"Compressed file is now 6464711 at quality 40"
/var/www/fromthepage/lib/image_helper.rb:81: warning: passing a block without an image argument is deprecated
"Compressed file is now 6197795 at quality 30"
/var/www/fromthepage/lib/image_helper.rb:81: warning: passing a block without an image argument is deprecated
"Compressed file is now 5738645 at quality 20"
compress_tree handling /tmp/fromthepage_uploads/19/KNH000004/page_0002.jpg)
Found image /tmp/fromthepage_uploads/19/KNH000004/page_0002.jpg
rake aborted!
Magick::ImageMagickError: width or height exceeds limit `/tmp/fromthepage_uploads/19/KNH000004/page_0002.jpg' @ error/cache.c/OpenPixelCache/3909
/var/lib/gems/3.0.0/gems/rmagick-4.2.6/lib/rmagick_internal.rb:1593:in `read'
/var/lib/gems/3.0.0/gems/rmagick-4.2.6/lib/rmagick_internal.rb:1593:in `block in initialize'
/var/lib/gems/3.0.0/gems/rmagick-4.2.6/lib/rmagick_internal.rb:1592:in `each'
/var/lib/gems/3.0.0/gems/rmagick-4.2.6/lib/rmagick_internal.rb:1592:in `initialize'
/var/www/fromthepage/lib/image_helper.rb:80:in `new'
/var/www/fromthepage/lib/image_helper.rb:80:in `block in compress_image'
/var/www/fromthepage/lib/image_helper.rb:77:in `downto'
/var/www/fromthepage/lib/image_helper.rb:77:in `each'
/var/www/fromthepage/lib/image_helper.rb:77:in `compress_image'
/var/www/fromthepage/lib/tasks/ingestor.rake:155:in `block in compress_tree'
/var/www/fromthepage/lib/tasks/ingestor.rake:147:in `each'
/var/www/fromthepage/lib/tasks/ingestor.rake:147:in `compress_tree'
/var/www/fromthepage/lib/tasks/ingestor.rake:151:in `block in compress_tree'
/var/www/fromthepage/lib/tasks/ingestor.rake:147:in `each'
/var/www/fromthepage/lib/tasks/ingestor.rake:147:in `compress_tree'
/var/www/fromthepage/lib/tasks/ingestor.rake:63:in `process_batch'
/var/www/fromthepage/lib/tasks/ingestor.rake:35:in `block (2 levels) in <main>'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/task.rb:279:in `block in execute'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/task.rb:279:in `each'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/task.rb:279:in `execute'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/task.rb:219:in `block in invoke_with_call_chain'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/task.rb:199:in `synchronize'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/task.rb:199:in `invoke_with_call_chain'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/task.rb:188:in `invoke'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/application.rb:160:in `invoke_task'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/application.rb:116:in `block (2 levels) in top_level'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/application.rb:116:in `each'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/application.rb:116:in `block in top_level'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/application.rb:125:in `run_with_threads'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/application.rb:110:in `top_level'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/application.rb:83:in `block in run'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/application.rb:186:in `standard_exception_handling'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/lib/rake/application.rb:80:in `run'
/usr/share/rubygems-integration/all/gems/rake-13.0.6/exe/rake:27:in `<top (required)>'
/usr/bin/rake:25:in `load'
/usr/bin/rake:25:in `<main>'
Tasks: TOP => fromthepage:process_document_upload
```


`Magick::ImageMagickError: width or height exceeds limit` seems to be the line that we need to look at. Searching for that I could find [this issue](https://github.com/benwbrum/fromthepage/issues/3637) reported in fromthepage repository itself, pointing to [a discussion](https://www.imagemagick.org/discourse-server/viewtopic.php?t=31438) that talks about how policy.xml of ImageMagick sets the maximum width of a file that it processes.

I checked the file on the server and found the relevant line like this:

```
  <policy domain="resource" name="width" value="16KP"/>
```

16KP. I thought the file wouldn't be wider than that. So I went to verify.

```bash
❯ pdfimages -list KNH000004.pdf
page   num  type   width height color comp bpc  enc interp  object ID x-ppi y-ppi size ratio
--------------------------------------------------------------------------------------------
   1     0 image    2250  2823  rgb     3   8  jpeg   no         4  0    72    72  946K 5.1%
   2     1 image    4000  2250  rgb     3   8  jpeg   no         7  0    72    72 1471K 5.6%
```

The maximum width was 4000 pixel in the second page. Why would it then exceed 16KP (which presumably means 16 * 1000 pixels).

So I went on the server to inspect the actual files.

```bash
$ cd /tmp/fromthepage_uploads/19/KNH000004
$ ls
page_0001.jpg  page_0002.jpg
$ identify page_0002.jpg 
page_0002.jpg JPEG 9375x16667 9375x16667+0+0 8-bit sRGB 9.23583MiB 0.000u 0:00.000
```

What, this was 16667 pixels wide! It seems like there is some processing step which increases the size.

The line `gs -r300x300 -dJPEGQ=30 -o '/tmp/fromthepage_uploads/19/KNH000004/page_%04d.jpg'` seemed like it might be doing this. I tried running this.

```bash
❯ gs -r300x300 -dJPEGQ=30 -o './page_%04d.jpg' -sDEVICE=jpeg './KNH000004.pdf'
GPL Ghostscript 10.03.1 (2024-05-02)
Copyright (C) 2024 Artifex Software, Inc.  All rights reserved.
This software is supplied under the GNU AGPLv3 and comes with NO WARRANTY:
see the file COPYING for details.
Processing pages 1 through 2.
Page 1
Page 2

❯ identify page_0002.jpg 
page_0002.jpg JPEG 9375x16667 9375x16667+0+0 8-bit sRGB 9.23583MiB 0.000u 0:00.000
```

Sure enough, this was the issue.

So I edited the policy.xml to:

```
  <policy domain="resource" name="width" value="32KP"/>
```

Now I deleted the stuck uploads and uploaded the file again. It failed again!

I tried to manually convert the image and it still failed. So I changed the values surrounding like 

```
  <policy domain="resource" name="memory" value="2GiB"/>
  <policy domain="resource" name="map" value="2GiB"/>
  <policy domain="resource" name="area" value="512MP"/>
  <policy domain="resource" name="disk" value="2GiB"/>
```

Now it worked!