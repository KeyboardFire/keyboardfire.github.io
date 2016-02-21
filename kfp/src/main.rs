mod home;
mod blog;

fn main() {
    home::gen_home().unwrap();
    blog::patch_blog().unwrap();
    blog::gen_blog().unwrap();
}
