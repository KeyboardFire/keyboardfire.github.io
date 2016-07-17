<!--METADATA
tags: code foo
date: 2016-02-25
title: On the merits of "roll your own blog engine"
-->
This blog, along with the rest of my website, runs on a (currently, as of 1st draft) [214 SLOC](https://github.com/KeyboardFire/kfp/tree/f20718fc5db49fdaf38b02e8263d37aba00de2c8) Rust backend. So my first blog post might as well be an explanation of why I chose to do it this way.

Of course, building a blog engine / CMS from scratch is an oft-ridiculed
endeavor. Don't reinvent the wheel, it's a waste of time, people have already
done it far better than you ever can, etc. There's even this quote from Jeff
Atwood, cofounder of Stack Exchange, creator of Discourse, and blogger on
[Coding Horror](http://blog.codinghorror.com/):

> Although I'll admit I've been sorely tempted myself, I wonder if writing your
> own blog software isn't a form of procrastination in and of itself.
>
> <sub>([source](http://blog.codinghorror.com/on-frameworkitis/))</sub>

So why *did* I resolve to create the tentatively-named `kfp`, "KeyboardFire
preprocessor"?

- **It's seamless.** I had previously tried both Wordpress and
  [Dropplets](http://dropplets.com/), and while I could wrestle with them both
  to get them to look *somewhat* like the rest of my website, they were by no
  means perfect. By necessity, my blog has always looked significantly
  different than the remainder of my hand-coded site.

    With an integrated solution, that's no longer the case. The way I've
    structured `kfp`, it allows me to simply use the same `TEMPLATE.html` for
    both the blog and any other page. This lets me achieve a flawless
    continuity throughout my website, even in the source code: I've added the
    extra touch of adapting to indentation level so that the HTML source code
    could even theoretically be believed to have been written by hand, should
    one not know better.

- **Infinite customizability.** Since `kfp` is strictly a *single-purpose*
  program, I'm not restricted to generalizations that platforms like Wordpress
  have to make in order to be usable by millions of people. Sure, I can patch
  the Wordpress source code, but naturally the codebase is *gigantic*, and I
  don't have the huge advantage of knowing the source code like the back of my
  hand, so thoroughly that I might have written it myself....

    As an example, take Markdown. `kfp` automagically renders `.md` blog posts
    written in Markdown format (with a short metadata block at the top) into
    HTML because [Markdown](https://en.wikipedia.org/wiki/Markdown) is
    substantially easier to write in than raw HTML. However, different Markdown
    renderers can have slightly different behavior; some have custom features
    such as footnotes, for instance. With a blog engine written from scratch, I
    can customize my markdown renderer without limitation. I can use *any*
    external renderer written in *any* language—I can even add my own
    specially-made features.

    Another more important example is how it works server-side. Wordpress runs
    on PHP, which means it requires the web host to support PHP in order to
    work. Since I'm hosting my website on Github Pages, I only get to serve
    static HTML. So instead of dynamically running code every time a user
    requests a page, I simply manually run `kfp` on my own machine and then
    push to Github. This way, all files served to the client are static HTML.
    `kfp` is also not dependent on any specific PHP version or anything of the
    like; it'll continue to work regardless of which webhost I'm using.

- **Avoided complexity.** As I mentioned in the previous point, Wordpress has
  the extra burden of catering to millions of people with thousands of
  different use cases. `kfp` is 214 lines of source code. Speaks for itself,
  really.

    And yes, yes, I don't have to use all of Wordpress's features, and disk
    space is cheap, and it's really not that big of a deal. But it's simply an
    extra perk, another benefit that I can get from going about things this
    way.

- **For practice!** I've learned a lot about Rust from writing `kfp`. As
  always, the best way to learn a new programming language is to just make
  stuff in it, and writing `kfp` with best practices in mind has taught me a
  lot. It's surprisingly fun, too.

I'm pretty happy with the way `kfp` and the newest (and hopefully last)
iteration of my website design have turned out. Although, I must confess...
Jeff Atwood's quote about procrastination rings a lot truer than I've been
indicating. ;)
