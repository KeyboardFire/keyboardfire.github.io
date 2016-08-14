<!--METADATA
tags: time
date: 2016-08-14
title: The One True Date/Time Format
-->
Everybody I meet seems to have a different way of writing down dates and times. Of the myriad of possibilities, to me, there's one that makes the most sense.

This is **The One True Date/Time Format**:

> 2016-08-13 19:45:28

That is, the year, month, and then day separated by dashes, then the hour (in
24-hour time), minute, and second separated by colons, with everything except
the year zero-padded to two digits. As noted by [the xkcd comic on date
formatting](https://xkcd.com/1179/), this is the [ISO
8601](https://en.wikipedia.org/wiki/ISO_8601) standard. That's not the only
advantage it has, though.

Firstly, the order of each date element makes intuitive sense. Starting with
the longest time period (year), the numbers are listed in order by the
magnitude of the amounts of time they represent, all the way down to seconds.
The month/day/year format, common in the US, isn't ordered logically like this,
but rather by how dates are spoken, which would only make sense if the date
were written spelled out ("September 13, 2016," not "8/13/16").

All numbers are also padded to two digits (except the year). Combined with the
previous point, this means that dates and times in this format sort extremely
nicely.  It's also—although this is completely a matter of personal
opinion—more aesthetically pleasing; I've always found "12/4/2015" to be quite
ugly and asymmetrical.

As for the separators, the hyphen has the marginal advantage that it can be
used in file names and can't possibly be confused for the number 1. Since the
ISO standard also specifies hyphens as separators, with slashes being used for
date ranges, I prefer to use hyphens over slashes (or dots).

24-hour time makes a lot more sense than 12-hour time. It gets rid of
confusion/ambiguity, it's more compact, it doesn't arbitrarily divide the day
at some irrelevant point, and it's consistent with how dates work (imagine if
we wrote dates differently depending on whether they were in the first or
second half of the year!).

Obviously, I can't convince everybody to switch to this format. But I can at
least outline my reasons for using it, and hopefully persuade a few people.
