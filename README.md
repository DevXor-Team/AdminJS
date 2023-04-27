<h1>AdminJs Template</h1>

It is a system from which you can access the data, modify it, add and delete files, and you can also add people who enter the site and they will have permissions like you.

Note: If you enter someone on the site, he will be able to access all the data, so he can delete or remove all the data, but you can read this link [AdminJsDocs](https://docs.adminjs.co/tutorials/adding-role-based-access-control) to find out how Giving certain people certain permissions without dangerous permissions.

Please note, I will not update or change the project, because it is just a project template to clarify the work with the AdminJs. I will not update or fix errors.
If you solve problems or make updates to improve them, please open the RP.

_This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details._

# Setup AdminJs

- ### Installing

Clone the repo on your machine

    git clone https://github.com/Developer-Tools-Discord/AdminJS.git

Navigate to the newly created AdminJS folder and install the npm packages

    npm install

- ### Credentials

Navigate to the `.env.example` file and rename it to `.env`.
Then fill out the following credentials:

1. Set the `Port` host port in localhost or IP VPS.
2. Set the `AdminUser` as a username to login.
3. Set the `AdminPassword` as a password to login dashboard.
4. Set the `MongoDB` key to your monogdb's connection URL.

- ### Deployment

To deploy the project simply run:

    npm start

If you installed and setup eveything correctly then the project should output something like this:

    AdminJS is running under localhost:${process.env.Port}/admin

<div align="center">
    <img src="Photos\AdminJs.png"/><br>
</div>
