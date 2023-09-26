# Introduction 
This is a simple blog application that allows users to create, edit, delete, like, and unlike blog posts. It's built using react,redux and context API.

# Getting Started with Blog APP

## Clone the Repository:

Clone this repository to your local machine using Git : https://github.com/Mohini675/blogs-post-app

## Accessing the Website :
You can access the website at : http://mohinipatelblogs.surge.sh/

## Website Features -

--> Reading Blogs  
    1.View your submitted posts in your Home Page. 
    2.Explore our blog posts by clicking on the "Continue Reading" button.

--> Add a new Blog 
    1. Click on the "New Blog" in your navbar.
    2. Fill the required details like- 
            -title : min length of 5 and max of 70.
            -categories : select the category from the select list.
            -content : You can write your content using WYSIWYG editor by which you can customise your text.
    3. Click "Add" to create a new blog post.

--> Edit a new Blog, Delete a new Blog, Like/Unlike blog
    1.Navigate to the blog post you want to edit.
    2.Click on the "Edit" button.
    3.Modify the blog post content as needed.
    4.Click "Update" to update the blog post. 

--> Deleting a Blog Post
    1.Navigate to the blog post you want to delete.
    2.Click on the "Delete" button.

--> Like/Unlike a Blog Post
    1.Navigate to the blog post you want to like/Unlike.
    2.Click on the "Like/Unlike" button.


## Technology Stack

website is built using react ,redux and context API.

    -Using Redux : implement Create , update , delete , toggleLike operation for blog.
    -Using Context API :
        1.ToastContext - Implement Toast Notification(Success/Error) and Validation constrainsts(Title,content,category).
        2.VisibilityContext - for visibility of Navbar or Footer.
