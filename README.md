# Synctera Front End Challenge

This project is a 'blank slate' environment but feel free to change/adjust/adapt anything you want. Pressing "Run" will compile the client-side code, and serve them via a small Express server.

The Express server has a `GET /transactions` endpoint. Take a look at the data it serves - this is your data source for the challenge. Use this data source to present a pleasant, professional and informative front-end experience.

## Story #1

### Background

A user wants to review a list and details about card transactions in the system.

### Requirements

Implement a view of transactions and a modal that allows to view transaction details.

- Display all transactions in a table
- Use a loading indicator until the data is ready to be presented.
- When a row is selected a modal should appear with the transaction details for that row.

## Story #2

### Background

A user wants to see transactions based on specific filters

### Requirements

Modify the express server to add data sources for the following:

- Top 10 merchants
- Top 10 by amount
- Top categories by amount

Then, add a dropdown to the UI to view transactions based on these options.

## Questions (long answer either in this document or a separate markdown file)

**- What would be some of the performance considerations for this application with hundreds of users? Thousands? Millions?**
  - With hundreds of users, the current implementation should be able to handle the load fine. However, as the number of users grows to thousands or millions, there are a number of bottlenecks that could arise.:
    - **Server-Side Performance:**
      - The Express server reads/parses the whole transactions.json file on each request, which would cause perf issues as the number of transactions grows.
      - We could improve server-side perf by using a proper db like postgresql that can handle the queries more efficiently.
    - **API Rate Limits:**
      - Rate limiting would help with preventing abuse and allow every user to fairly use the app.
    - **Caching:**
      - Server-Side caching would help reduce the number of db queries and speed up the response times.
    - **Frontend Perf:**
      - Rendering the whole dataset in the TransactionTable component will probably cause perf issues on the clientside. Pagination, infinite scrolling or virtualization would help by allowing the dataset to be rendered only one portion at a time.
        - (Using mui's x-data-grid or similar grid libraries would help with this)

**- How would you think about the privacy of the data being explored in this application?**
  - Data privacy is always crucial, but especially when dealing with financial information.
    - Data should be encrypted in transit via HTTPs and at rest via AES (or similar).
    - PII should be anonymized to protect the privacy of the user while keeping the data useful.
    - Access control needs to be implemented. A role-based access control system following the principal of least privilage is ideal for this kind of application.

**- From a security perspective how would you propose to manage the authentication and authorization of the end user for this application?**
  - I would propose to manage authentication by using an authentication provider like OAuth, SAML or OpenID Connect for user authentication. They are secure and standardized methods and are easily integrated with flexible identity provide approaches.
  - I would propose to manage authorization by using RBAC for managing user permissions which will ensure only users that are authorized to perform actions/access data are allowed to in the app.
  - API endpoints should also be protected via authentication middleware that verfies user identity for the same reasons as above w.r.t. action/access authorization.
  - Auditing and monitoring mechanisms would also help track user activity and identify possible security threats. This would also help with incident response, triage and general product development over time.

## Other Requirements and Tips

- Decide on a layout which is simple and yet effective: demonstrate your user experience sensibilities but don't over-index on making this a pixel-perfect interface; we are wanting to get a sense of coding style and approach
- We care more about completeness than perfection, manage your time accordingly
- You can import any third party library provided that the license allows free use
- The project should be run in this 'repl.it' environment and should execute when the 'run' button is invoked
- Any documentation or comments can be added in the code or as standalone markdown files
