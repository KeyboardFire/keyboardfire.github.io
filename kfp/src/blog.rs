use std::collections::HashMap;

use std::fs::{self, File};
use std::io::{self, Read, Write, BufWriter};

extern crate hoedown;
use self::hoedown::*;
use self::hoedown::renderer::html;

extern crate chrono;
use self::chrono::*;

struct Post {
    title: String, date: NaiveDate, summary: String, slug: String
}

pub fn patch_blog() -> Result<(), io::Error> {
    // TODO
    Ok(())
}

pub fn gen_blog() -> Result<(), io::Error> {
    // we need to keep a thing of all the posts in each category, in
    //   chronological order, so that we can generate a.) /blog.html and b.)
    //   /blog/somecategory/index.html
    // this is that thing
    let mut posts = HashMap::new();
    for category in vec!["lojban", "books"] {
        posts.insert(category, Vec::<Post>::new());
    }

    // slurp the entire template file into memory
    // yum
    let mut template_file = try!(File::open("data/blog/TEMPLATE.html"));
    let mut template = String::new();
    try!(template_file.read_to_string(&mut template));

    // let's generate /blog/somecategory/somepost.html first
    let files = try!(fs::read_dir("data/blog"));
    for file in files {
        let path = file.unwrap().path();
        if !path.ends_with("TEMPLATE.html") {
            let mut md_file = try!(File::open(path.clone()));
            let mut md = String::new();
            try!(md_file.read_to_string(&mut md));

            let mut metadata = HashMap::new();
            let mut looking_for_summary = false;
            for line in md.lines().skip_while(|x| *x != "<!--METADATA").skip(1) {
                if looking_for_summary {
                    metadata.insert("summary", line);
                    break;
                }
                if line == "-->" { looking_for_summary = true; }
                else {
                    let colon = line.find(':')
                        .expect("metadata line missing colon");
                    metadata.insert(&line[..colon], &line[colon+2..]);
                }
            }
            let (title, date, category, summary) = (
                *metadata.get("title").expect("metadata missing title"),
                *metadata.get("date").expect("metadata missing date"),
                *metadata.get("category").unwrap_or(&"uncategorized"),
                *metadata.get("summary").expect("metadata missing summary"));

            let fname = path.file_name().unwrap().to_str().unwrap();
            let mut bw = BufWriter::new(try!(File::create(format!(
                "../blog/{}/{}.html", category, &fname[..fname.len()-3]))));

            if let Some(v) = posts.get_mut(category) {
                v.push(Post {
                    title: title.to_string(),
                    date: NaiveDate::parse_from_str(date, "%Y-%m-%d")
                        .expect("metadata date parse error"),
                    summary: summary.to_string(),
                    slug: (&fname[..fname.len()-3]).to_string()
                });
            } else {
                println!("warning: category {} not found, ignoring post",
                        category);
            }

            for template_line in template.lines() {
                if template_line.ends_with("<!--<>-->") {
                    // this range-map-collect thing probably isn't too
                    // idiomatic, but who cares
                    let indent: String = (0..template_line.find(|c| c != ' ')
                        .unwrap()).map(|_| ' ').collect();
                    try!(writeln!(bw, "{}<h2>{}<div class='subheader'>posted \
                                       on {} in category <a href='/blog/{}'>\
                                       {3}</a></div></h2>",
                            indent, title, date, category));
                    let doc = Markdown::new(&md[..]);
                    let mut html = Html::new(html::Flags::empty(), 0);
                    for line in html.render(&doc).to_str().unwrap().lines() {
                        try!(writeln!(bw, "{}{}", indent, line));
                    }
                } else {
                    try!(writeln!(bw, "{}", template_line));
                }
            }
        }
    }

    // sort the list of posts by date real quick
    for (_, v) in posts.iter_mut() {
        v.sort_by(|a, b| b.date.cmp(&a.date));
    }

    // now let's generate /blog/somecategory/index.html next
    for category in posts.keys() {
        let mut bw = BufWriter::new(try!(File::create(format!(
            "../blog/{}/index.html", category))));

        for template_line in template.lines() {
            if template_line.ends_with("<!--<>-->") {
                let indent: String = (0..template_line.find(|c| c != ' ')
                    .unwrap()).map(|_| ' ').collect();

                try!(writeln!(bw, "{}<h2>Posts in category [{}]</h2>",
                        indent, category));
                for post in posts.get(category).unwrap() {
                    try!(writeln!(bw,
                     "{0}<section class='post'>\
                    \n{0}   <h3>\
                    \n{0}       <a href='/blog/{1}/{2}.html'>{3}</a>\
                    \n{0}       <div class='subheader'>{4}</div></h3>\
                    \n{0}   <p>{5}</p>\
                    \n{0}</section>",
                    indent, category, post.slug, post.title, post.date,
                        post.summary));
                }
            } else {
                try!(writeln!(bw, "{}", template_line));
            }
        }
    }

    Ok(())
}
