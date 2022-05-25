# Technical choices

We have used Vue 3, CSS, TypeScript, JavaScript, and HTML for the development of this project.


# Architecture

### Vue version : 3
### Vue Router
### Vuex (Store Management)

Application is created using vue-cli.

Each page has a separate route. (For more secure application we can implement route guard based on permission)

Right now calculation logic is implemented on the view page. (If we have multiple uses of function, we can create mixins or common factory files)

Vuex is used for store management. So data will be accessible on the other pages.


# Approach

Based on the requirements provided with the wireframes, I developed a multi-step form where users can fill in information, get a price and buy an insurance policy.

There were total 4 screens developed for this project:
Page 1
Page 2
Page 2 - age error
Page 3

I implemented all the logics mentioned in the requirements.

Additionally, on Page 3 when a user clicks on the Buy button the system shall display a successful purchase message. And clicking on Ok button will redirect to Page 1. I have added the alert message to provide confirmation of the purchase to the user. 