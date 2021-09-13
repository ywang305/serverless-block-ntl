## ntl cli

- functions path
  /.netlify/functions/...

- Ntl CLI ref
  [Netlify CLI Command List](https://cli.netlify.com/)

- ntl init
  create and confiure a new site
  create netlify/functions
  create toml
  ...
- ntl open
  open the live server
- ntl dev
  local server
- ntl env:.. # env is sync back and front automatically!

  ```bash
  netlify env:list
  netlify env:get VAR_NAME
  netlify env:set VAR_NAME value
  netlify env:unset VAR_NAME
  netlify env:import fileName
  ```

- AWS lambda middleware

  - [middy](https://middy.js.org/)

- RPCs
  - [bitcoin](https://developer.bitcoin.org/reference/rpc/index.html)
