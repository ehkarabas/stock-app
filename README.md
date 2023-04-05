<div align=center>
	<h1>Stock App</h1>
</div>

<div align="center">
	<a href="https://stock-app-ehkarabas.netlify.app/">
		<img src="https://img.shields.io/badge/live-%23.svg?&style=for-the-badge&logo=www&logoColor=white%22&color=black">
	</a>
	<br>
	<img src="./public/images/stock-app-presentation1.gif"/>
	<img src="./public/images/stock-app-presentation2.gif"/>
	<img src="./public/images/stock-app-presentation3.gif"/>
</div>

## Description

A React app that accepts access through user authentication, stores inputs received from end-users, and establishes relationships with the backend among different sections, while updating, storing, and displaying product purchase-sale information, company information, brand information, and remaining stock information. Most of the forms are structured with Formik and validated with Yup. Authentication process is stored using Redux Persist, ensuring that logged-in users can access restricted application even if the page is refreshed.

## Goals

Practicing on components, props, tailwind, MUI, auth storing via redux persist, redux, redux-toolkit(slices, configureStore), axios(custom hook containing instance with authorization configuration), using multiple hooks in another hook via custom hooks, react-router(private router included), .env(to hide API datas), _redirect file in case of refreshing issues on host, taostify, formik to configure and yup to validate forms, tremor charts, React hooks.

## Installation

To run this app on your local, run commands below on the terminal:

1. Clone the repo on your local.
    ```shell
    $ git clone https://github.com/ehkarabas/stock-app.git
    ```

2. Install node modules to the repo.
    ```shell
    $ yarn install
    
    or

    $ npm install
    ```

3. Run the app on your browser.
    ```shell
    $ yarn start
    
    or

    $ npm start
    ```

## Resource Structure 

```
blog-app(folder)
|
|-- README.md
|-- package.json
|-- public
|   |-- _redirect
|   |-- images
|   |   |-- stock-app-presentation1.gif
|   |   |-- stock-app-presentation2.gif
|   |   |-- stock-app-presentation3.gif
|   |-- index.html
|-- src
|   |-- App.js
|   |-- app
|   |   |-- store.jsx
|   |-- assets
|   |   |-- loading.gif
|   |   |-- result.svg
|   |-- components
|   |   |-- BrandCard.jsx
|   |   |-- Charts.jsx
|   |   |-- FirmCard.jsx
|   |   |-- KpiCards.jsx
|   |   |-- LoginForm.jsx
|   |   |-- MenuListItems.jsx
|   |   |-- ProductCard.jsx
|   |   |-- RegisterForm.jsx
|   |   |-- modals
|   |       |-- BrandModal.jsx
|   |       |-- FirmModal.jsx
|   |       |-- ProductModal.jsx
|   |       |-- PurchaseModal.jsx
|   |       |-- SaleModal.jsx
|   |-- features
|   |   |-- authSlice.jsx
|   |   |-- stockSlice.jsx
|   |-- helper
|   |   |-- ToastNotify.js
|   |-- hooks
|   |   |-- useAuthCall.jsx
|   |   |-- useAxios.jsx
|   |   |-- useStockCall.jsx
|   |-- index.css
|   |-- index.js
|   |-- pages
|   |   |-- Brands.jsx
|   |   |-- Dashboard.jsx
|   |   |-- Firms.jsx
|   |   |-- Home.jsx
|   |   |-- Login.jsx
|   |   |-- Products.jsx
|   |   |-- Purchases.jsx
|   |   |-- Register.jsx
|   |   |-- Sales.jsx
|   |-- router
|   |   |-- AppRouter.jsx
|   |   |-- PrivateRouter.jsx
|   |-- styles
|       |-- globalStyles.js
|-- tailwind.config.js
|-- yarn.lock
```