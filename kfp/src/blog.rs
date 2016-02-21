use std::fs::{self, File};
use std::io::{self, Read, BufRead, BufReader, Write, BufWriter};

pub fn patch_blog() -> Result<(), io::Error> {
    Ok(())
}

pub fn gen_blog() -> Result<(), io::Error> {
    // slurp the entire template file into memory
    // yum
    let mut template_file = try!(File::open("data/blog/TEMPLATE.html"));
    let mut template = String::new();
    try!(template_file.read_to_string(&mut template));

    let files = try!(fs::read_dir("data/blog"));
    for file in files {
        let path = file.unwrap().path();
        if !path.ends_with("TEMPLATE.html") {
            let mut md_file = try!(File::open(path.clone()));
            let mut md = String::new();
            try!(md_file.read_to_string(&mut md));

            let mut category: Option<&str> = None;
            for line in md.lines().skip_while(|x| *x != "<!--METADATA").skip(1) {
                if line == "-->" { break; }
                if line.starts_with("category: ") {
                    category = Some(&line[10..]);
                }
            }

            let fname = path.file_name().unwrap().to_str().unwrap();
            let mut bw = BufWriter::new(try!(File::create(format!("../blog/{}/{}.html",
                    category.unwrap(), &fname[..fname.len()-3]))));

            let mut template_lines = template.lines();
            let mut indent_level = 0;
            while let Some(template_line) = template_lines.next() {
                if template_line.ends_with("<!--<>-->") {
                    indent_level = template_line.find(|c| c != ' ').unwrap();
                    break;
                } else {
                    try!(writeln!(bw, "{}", template_line));
                }
            }
            for line in md.lines() {
                // this range-map-collect thing probably isn't too idiomatic
                // but who cares
                try!(writeln!(bw, "{}{}", (0..indent_level).map(|_| ' ')
                        .collect::<String>(), line));
            }
            for template_line in template_lines {
                try!(writeln!(bw, "{}", template_line));
            }
        }
    }

    Ok(())
}
