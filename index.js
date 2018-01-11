const Koa = require('koa');
const axios = require('axios');
const app = new Koa();

const port = process.env.PORT || 3000;

function addStyle(html) {
  return html.replace(/<\/head>/, `<style>
  body {
      background: #212121;
      color: #bfbfbf;
      line-height: 1.5;
      font-size: 16px;
  }
  
  a, a.selflink {
      color: #ffc47e;
      text-decoration: none;
  }
  
  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
      font-size: 20px;
      display: block;
      line-height: 1.5;
      margin: 0;
  }
  
  .docinfo {
      background-color: transparent;
  }
  
  .top{
    border: none;
  }
  
  .content {
      margin: auto !important;
  /*    border-left: 1px solid;
      border-right: 1px solid; */
      padding: 20px;
  }
  
  pre {
      line-height: 2;
      font-family: monaco;
  }
    </style>
    <\/head>`);
}

app.use(async (ctx) => {
  const resp = await axios.get(`https://tools.ietf.org${ctx.path}`, {
    responseType:'arraybuffer',
  });
  
  ctx.res.writeHead(resp.status, resp.statusText, resp.headers);
  ctx.res.write(/\/html\/rfc/.test(ctx.path) ? addStyle(resp.data.toString()) : resp.data, 'binary');
  ctx.res.end();
});

app.listen(port, () => {
  console.log(`proxy is listening on port ${port}`);
});