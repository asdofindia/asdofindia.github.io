+++
type = 'post'
title = 'Anatomy of an Amazon Hard Disk Scam (GAZELLE)'
tags = ['society']
date = '2025-01-20'
+++

##### My friend got scammed by a seller on Amazon named "No Doubt" who sold a very old, used Seagate hard disk as new. #####

I was helping do some testdisk/photorec data recovery for my friend. Since I am not a professional I don't have all the hardware tools. The most important of which is a spare hard disk. So I asked my friend to get me one. He ordered on Amazon and I received a *brand new* 500 GB hard disk drive *manufactured* and marketed by "NO DOUBT ROADPALI KALAMBOLI Maharashtra - 410218".

When I opened the package, I got a card which asked to leave a review in return of a free hard drive carrying case.

That was red flag 1. 

When I started copying some files into the hard disk, it started making noises. And the copying randomly failed. Red flags 2 and 3.

So, in situations like these, we can use `smartctl -a /dev/sdb` (where sdb is the device) to check the "Self-Monitoring, Analysis, and Reporting Technology" status. I did it for this hard disk and discovered that it was a used, failing seagate harddisk.

So, that's the scam. 

What can you do to protect yourself?

The good old Mozilla has an add-on called [fakespot](https://blog.mozilla.org/en/products/how-to-use-fakespot/) which warns you about fake reviews and bad sellers. Install that while shopping. [Fakespot.com](https://www.fakespot.com/)

Attached below you'll find more details about the scammers, and the smartctl output.


---

### Scammer details

Their customer care number 9702822629 and their email: nodoubtindia@gmail.com.

### Review bribe content

"Thank you for choosing our portable hard drive! We hope you're enjoying it. We'd love to hear your feedback. Please leave a review by: Going to your order history. Finding the Portable Hard Drive order. Clicking "Write a product review." As a thank you, we'll send you a free External Hard Drive Carrying Case! After leaving review, reply with your order number and a screenshot of the review to WhatsApp: +91 97028 22629. If you need help, contact our customer service team. Thank you for your support! Best regards, Customer service.

There was also a contact card kind of thing which said "1 year hardware warranty" with the same whatsapp number as technical support. The product name "New- Gazelle high speed ...(Black) 1 year warranty" 

### SMART output

```
$ sudo smartctl -a /dev/sdc
7.4 2023-08-01 r5530 [x86_64-linux-6.12.9-zen1-1-zen] (local build)
Copyright (C) 2002-23, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF INFORMATION SECTION ===
Model Family:     Seagate Laptop HDD
Device Model:     ST500LM021-1KJ152
Serial Number:    W62DN55C
LU WWN Device Id: 5 000c50 09c84b466
Firmware Version: 0005SDM1
User Capacity:    500,107,862,016 bytes [500 GB]
Sector Sizes:     512 bytes logical, 4096 bytes physical
Rotation Rate:    7200 rpm
Form Factor:      2.5 inches
Device is:        In smartctl database 7.3/5528
ATA Version is:   ATA8-ACS T13/1699-D revision 4
SATA Version is:  SATA 3.0, 6.0 Gb/s (current: 6.0 Gb/s)
Local Time is:    Mon Jan 20 20:57:01 2025 IST
SMART support is: Available - device has SMART capability.
SMART support is: Enabled

=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED

General SMART Values:
Offline data collection status:  (0x00)	Offline data collection activity
					was never started.
					Auto Offline Data Collection: Disabled.
Self-test execution status:      (   0)	The previous self-test routine completed
					without error or no self-test has ever 
					been run.
Total time to complete Offline 
data collection: 		(    0) seconds.
Offline data collection
capabilities: 			 (0x73) SMART execute Offline immediate.
					Auto Offline data collection on/off support.
					Suspend Offline collection upon new
					command.
					No Offline surface scan supported.
					Self-test supported.
					Conveyance Self-test supported.
					Selective Self-test supported.
SMART capabilities:            (0x0003)	Saves SMART data before entering
					power-saving mode.
					Supports SMART auto save timer.
Error logging capability:        (0x01)	Error logging supported.
					General Purpose Logging supported.
Short self-test routine 
recommended polling time: 	 (   1) minutes.
Extended self-test routine
recommended polling time: 	 (  77) minutes.
Conveyance self-test routine
recommended polling time: 	 (   2) minutes.
SCT capabilities: 	       (0x1035)	SCT Status supported.
					SCT Feature Control supported.
					SCT Data Table supported.

SMART Attributes Data Structure revision number: 10
Vendor Specific SMART Attributes with Thresholds:
ID# ATTRIBUTE_NAME          FLAG     VALUE WORST THRESH TYPE      UPDATED  WHEN_FAILED RAW_VALUE
  1 Raw_Read_Error_Rate     0x000f   097   097   006    Pre-fail  Always       -       240493525
  3 Spin_Up_Time            0x0003   099   098   000    Pre-fail  Always       -       0
  4 Start_Stop_Count        0x0032   097   097   020    Old_age   Always       -       3876
  5 Reallocated_Sector_Ct   0x0033   097   097   036    Pre-fail  Always       -       584
  7 Seek_Error_Rate         0x000f   078   060   030    Pre-fail  Always       -       17472697843
  9 Power_On_Hours          0x0032   092   092   000    Old_age   Always       -       7049 (181 188 0)
 10 Spin_Retry_Count        0x0013   100   100   097    Pre-fail  Always       -       0
 12 Power_Cycle_Count       0x0032   097   097   020    Old_age   Always       -       3808
184 End-to-End_Error        0x0032   100   100   099    Old_age   Always       -       0
187 Reported_Uncorrect      0x0032   001   001   000    Old_age   Always       -       183
188 Command_Timeout         0x0032   090   001   000    Old_age   Always       -       163211248533
189 High_Fly_Writes         0x003a   100   100   000    Old_age   Always       -       0
190 Airflow_Temperature_Cel 0x0022   062   048   045    Old_age   Always       -       38 (Min/Max 38/40)
191 G-Sense_Error_Rate      0x0032   100   100   000    Old_age   Always       -       718
192 Power-Off_Retract_Count 0x0032   100   100   000    Old_age   Always       -       35
193 Load_Cycle_Count        0x0032   071   071   000    Old_age   Always       -       58423
194 Temperature_Celsius     0x0022   038   052   000    Old_age   Always       -       38 (0 18 0 0 0)
197 Current_Pending_Sector  0x0012   091   091   000    Old_age   Always       -       193
198 Offline_Uncorrectable   0x0010   091   091   000    Old_age   Offline      -       193
199 UDMA_CRC_Error_Count    0x003e   200   200   000    Old_age   Always       -       0
240 Head_Flying_Hours       0x0000   093   093   000    Old_age   Offline      -       6893 (132 13 0)
241 Total_LBAs_Written      0x0000   100   253   000    Old_age   Offline      -       28644572412
242 Total_LBAs_Read         0x0000   100   253   000    Old_age   Offline      -       40673347330
254 Free_Fall_Sensor        0x0032   001   001   000    Old_age   Always       -       49

SMART Error Log Version: 1
ATA Error Count: 109 (device log contains only the most recent five errors)
	CR = Command Register [HEX]
	FR = Features Register [HEX]
	SC = Sector Count Register [HEX]
	SN = Sector Number Register [HEX]
	CL = Cylinder Low Register [HEX]
	CH = Cylinder High Register [HEX]
	DH = Device/Head Register [HEX]
	DC = Device Command Register [HEX]
	ER = Error register [HEX]
	ST = Status register [HEX]
Powered_Up_Time is measured from power on, and printed as
DDd+hh:mm:SS.sss where DD=days, hh=hours, mm=minutes,
SS=sec, and sss=millisec. It "wraps" after 49.710 days.

Error 109 occurred at disk power-on lifetime: 7049 hours (293 days + 17 hours)
  When the command that caused the error occurred, the device was active or idle.

  After command completion occurred, registers were:
  ER ST SC SN CL CH DH
  -- -- -- -- -- -- --
  40 51 00 00 1e 02 00  Error: UNC at LBA = 0x00021e00 = 138752

  Commands leading to the command that caused the error were:
  CR FR SC SN CL CH DH DC   Powered_Up_Time  Command/Feature_Name
  -- -- -- -- -- -- -- --  ----------------  --------------------
  60 00 ef 11 1e 02 40 00      00:00:19.408  READ FPDMA QUEUED
  60 00 01 10 1e 02 40 00      00:00:19.407  READ FPDMA QUEUED
  60 00 01 0f 1e 02 40 00      00:00:19.407  READ FPDMA QUEUED
  60 00 01 0e 1e 02 40 00      00:00:19.407  READ FPDMA QUEUED
  60 00 01 0d 1e 02 40 00      00:00:19.407  READ FPDMA QUEUED

Error 108 occurred at disk power-on lifetime: 7049 hours (293 days + 17 hours)
  When the command that caused the error occurred, the device was active or idle.

  After command completion occurred, registers were:
  ER ST SC SN CL CH DH
  -- -- -- -- -- -- --
  40 51 00 00 1e 02 00  Error: WP at LBA = 0x00021e00 = 138752

  Commands leading to the command that caused the error were:
  CR FR SC SN CL CH DH DC   Powered_Up_Time  Command/Feature_Name
  -- -- -- -- -- -- -- --  ----------------  --------------------
  61 00 00 00 3b 8e 40 00      01:00:15.000  WRITE FPDMA QUEUED
  61 00 00 00 37 8e 40 00      01:00:15.000  WRITE FPDMA QUEUED
  61 00 00 00 33 8e 40 00      01:00:14.974  WRITE FPDMA QUEUED
  61 00 00 00 2f 8e 40 00      01:00:14.974  WRITE FPDMA QUEUED
  61 00 00 00 2b 8e 40 00      01:00:14.974  WRITE FPDMA QUEUED

Error 107 occurred at disk power-on lifetime: 7049 hours (293 days + 17 hours)
  When the command that caused the error occurred, the device was active or idle.

  After command completion occurred, registers were:
  ER ST SC SN CL CH DH
  -- -- -- -- -- -- --
  40 51 00 00 1e 02 00  Error: UNC at LBA = 0x00021e00 = 138752

  Commands leading to the command that caused the error were:
  CR FR SC SN CL CH DH DC   Powered_Up_Time  Command/Feature_Name
  -- -- -- -- -- -- -- --  ----------------  --------------------
  60 00 ff 01 1e 02 40 00      00:57:29.101  READ FPDMA QUEUED
  60 00 01 00 1e 02 40 00      00:57:29.101  READ FPDMA QUEUED
  60 00 00 00 6d 25 40 00      00:57:23.359  READ FPDMA QUEUED
  60 00 01 ff 68 25 40 00      00:57:21.010  READ FPDMA QUEUED
  60 00 01 fe 68 25 40 00      00:57:21.010  READ FPDMA QUEUED

Error 106 occurred at disk power-on lifetime: 7049 hours (293 days + 17 hours)
  When the command that caused the error occurred, the device was active or idle.

  After command completion occurred, registers were:
  ER ST SC SN CL CH DH
  -- -- -- -- -- -- --
  40 51 00 00 1e 02 00  Error: UNC at LBA = 0x00021e00 = 138752

  Commands leading to the command that caused the error were:
  CR FR SC SN CL CH DH DC   Powered_Up_Time  Command/Feature_Name
  -- -- -- -- -- -- -- --  ----------------  --------------------
  60 00 e8 18 1e 02 40 00      00:56:08.580  READ FPDMA QUEUED
  60 00 01 17 1e 02 40 00      00:56:08.580  READ FPDMA QUEUED
  60 00 01 16 1e 02 40 00      00:56:08.580  READ FPDMA QUEUED
  60 00 01 15 1e 02 40 00      00:56:08.580  READ FPDMA QUEUED
  60 00 01 14 1e 02 40 00      00:56:08.580  READ FPDMA QUEUED

Error 105 occurred at disk power-on lifetime: 7049 hours (293 days + 17 hours)
  When the command that caused the error occurred, the device was active or idle.

  After command completion occurred, registers were:
  ER ST SC SN CL CH DH
  -- -- -- -- -- -- --
  40 51 00 00 1e 02 00  Error: UNC at LBA = 0x00021e00 = 138752

  Commands leading to the command that caused the error were:
  CR FR SC SN CL CH DH DC   Powered_Up_Time  Command/Feature_Name
  -- -- -- -- -- -- -- --  ----------------  --------------------
  60 00 00 00 1e 02 40 00      00:55:38.308  READ FPDMA QUEUED
  60 00 00 00 a3 00 40 00      00:55:31.699  READ FPDMA QUEUED
  60 00 00 00 9f 00 40 00      00:55:31.698  READ FPDMA QUEUED
  60 00 00 00 9b 00 40 00      00:55:31.698  READ FPDMA QUEUED
  60 00 00 00 97 00 40 00      00:55:31.698  READ FPDMA QUEUED

SMART Self-test log structure revision number 1
Num  Test_Description    Status                  Remaining  LifeTime(hours)  LBA_of_first_error
# 1  Short offline       Completed without error       00%         1         -

SMART Selective self-test log data structure revision number 1
 SPAN  MIN_LBA  MAX_LBA  CURRENT_TEST_STATUS
    1        0        0  Not_testing
    2        0        0  Not_testing
    3        0        0  Not_testing
    4        0        0  Not_testing
    5        0        0  Not_testing
Selective self-test flags (0x0):
  After scanning selected spans, do NOT read-scan remainder of disk.
If Selective self-test is pending on power-up, resume after 0 minute delay.

The above only provides legacy SMART information - try 'smartctl -x' for more

```