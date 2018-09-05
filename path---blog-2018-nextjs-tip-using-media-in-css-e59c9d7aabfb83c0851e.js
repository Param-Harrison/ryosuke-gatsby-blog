webpackJsonp([0x9bc41c53cd28],{562:function(n,s){n.exports={data:{blog:{html:'<p>Recently I was setting up a <a href="http://nextjs.org">NextJS</a> project with <a href="http://lesscss.org">LESS</a> and CSS, and I was having an issue where my relative media files weren\'t getting loaded. I was getting this odd error from webpack saying there was an unexpected character?:</p>\n<p>Scrolling past this first chunk of error code in the server\'s console log showed that my PNG and SVG files weren\'t recognized:</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">These relative modules were not found:\n\n* ../../assets/images/Brand/kushy-logo-short-white.svg in ./components/Header/Header.less\n* ../../assets/images/Brand/Kushy API Logo.png in ./components/Header/Header.less</code></pre>\n      </div>\n<h2>The first solution</h2>\n<p>I found this solution on <a href="https://github.com/zeit/next.js/issues/3852">the NextJS Github issues</a>, where someone adds a custom Webpack config to parse media files using <code class="language-text">url-loader</code>:</p>\n<p>next.config.js:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token function">withCSS</span><span class="token punctuation">(</span><span class="token function">withSass</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token function">webpack</span> <span class="token punctuation">(</span>config<span class="token punctuation">,</span> options<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    config<span class="token punctuation">.</span>module<span class="token punctuation">.</span>rules<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      test<span class="token punctuation">:</span> <span class="token regex">/\\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/</span><span class="token punctuation">,</span>\n      use<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        loader<span class="token punctuation">:</span> <span class="token string">\'url-loader\'</span><span class="token punctuation">,</span>\n        options<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n          limit<span class="token punctuation">:</span> <span class="token number">100000</span>\n        <span class="token punctuation">}</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">return</span> config\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>This didn\'t work for me, and I started getting an error about <code class="language-text">url-loader</code> not being loaded (ironically). I installed it, and got errors that <code class="language-text">file-loader</code> wasn\'t installed? I installed that and....it worked!</p>\n<p><code class="language-text">npm install url-loader file-loader --save-dev</code></p>\n<h2>Another solution</h2>\n<p>Copy your images to the <code class="language-text">static</code> folder in your app\'s root. This allows you to access them in your CSS (<code class="language-text">background:url(&#39;/static/image.png&#39;)</code>). That easy 👌</p>\n<p>The reason you can\'t do this with NextJS is their webpack setup. <a href="https://github.com/zeit/next.js/issues/1935">They don\'t run webpack on the server level</a>, which doesn\'t allow for syncing up of files like you get with other webpack setups. You have to extend their Webpack config with your own config options (like above), or use the simple system they put in place (static files served from a single folder). </p>\n<h2>Isn\'t there a plugin?</h2>\n<p>There\'s a library called <a href="https://github.com/arefaslani/next-images">next-images</a> which tries to solve this problem by calling a <code class="language-text">require()</code> function on any media you want to import on the fly. The issue with this is adding opinionated API code to CSS. It <em>requires</em> (see what I did there?) that you add the <code class="language-text">require()</code> function on every relative image URL. If I were to import my CSS from NPM to keep it consistent with my team, I\'d have issues overriding any image definitions with the necessary import function.</p>\n<h2>Real world example</h2>\n<p>I had an issue using the Semantic UI design system where it used relative font files for icons, and I was forced either setup a custom webpack config -- or manually copy them into my static folder and override the CSS definitions (<code class="language-text">@fontPath  : &#39;/static/assets/fonts&#39;;</code>). Both worked fine, and I stuck with the custom webpack setup.</p>\n<blockquote>\n<p>I did have a problem importing files because of bad URLs in the LESS variables (it was importing from <code class="language-text">../../themes/themes/</code> instead of just <code class="language-text">../../themes/</code>). This was solved with a quick variable override: <code class="language-text">@fontPath  : &#39;../../default/assets/fonts&#39;;</code>. Not a NextJS issue, but thought I\'d document it.</p>\n</blockquote>\n<p>Hope that helps,\nRyo</p>\n<hr>\n<p><strong>References:</strong></p>\n<ul>\n<li><a href="https://github.com/zeit/next.js/">NextJS</a></li>\n<li><a href="https://github.com/arefaslani/next-images">next-images</a></li>\n<li><a href="https://github.com/zeit/next.js/issues/1935">NextJS Issue #1935 - Importing images in CSS</a></li>\n<li><a href="https://github.com/zeit/next.js/issues/3852">NextJS Issue #3852 - Importing images in CSS</a></li>\n<li><a href="https://github.com/webpack-contrib/file-loader">file-loader</a></li>\n<li><a href="https://github.com/webpack-contrib/url-loader">url-loader</a></li>\n</ul>',frontmatter:{title:"NextJS Tip - Using Media (Images & Fonts) in CSS",cover_image:{publicURL:"/static/NextJS-Tip-Using-Media-in-CSS-ec600eaa2f437b3b130a814e42204e6b.jpg",childImageSharp:{sizes:{tracedSVG:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='267' viewBox='0 0 400 267' version='1'%3E%3Cpath d='M0 133v134h12c11 0 12 0 13-2 0-2 2-3 3-3l6-3c2-2 2-3 0-3s-2-1-2-8c0-4-2-8-4-7l1 2c1 1 1 1-1 1l-2-1-2-1v-1l2-1 2-2 5-6v2l1 1 1 2c0 2 0 3 2 3 3 0 4 0 4 2l1 3 1-3c2-3 3-3 3 1 0 2 0 3 2 3 1 0 2-1 1-2 0-1 1-2 3-2 2-1 2-1 1-2-3-1-4-3-3-5 0-4 2-4 2 0v3l1-3c1-3 1-3 2-2h1c-1-2 0-2 2-2h2l-2-2c-4-4-6-4-5-1 0 2 0 2-2 2l-4-3-3-1-2-1-3-1-3-1 6-1 6 1c0 2 4 2 6 0h2c1 2 3 0 3-4l1-3 2 6 1 3 1-1 1-2 1 1 3 1c3 0 3 0 3 5 0 3 0 4-2 4-1 0-2 0-1 2l-1 1-1 2c0 2 1 1 4-2 4-3 4-8 2-14-1-2-5-3-5-1l-1 1v-5l4-1v-1l-1-2 2 1c1 2 3 3 2 0h1c1 0 2 1 1 2l2 3 2 3 1 2c2 0 3 2 3 5l-1 1-1 1c-1 1 0 1 1 1l2-1 4 1c3 1 4 1 4 4 0 5-1 8-3 8s-2 0-1 2 1 2-7 2l-4 1c0 1 2 2 5 2 2 0 4 3 6 8s3 6 4 4c3-2 2-4 0-4-2-1-2-1-1-5 0-5 2-7 7-6 3 0 3 0 3-2v-3c1-1 1 0 1 1 0 2 0 2 1 1 1-2 14-1 19 2 3 1 3 1 2 3l-2 2h1c2-2 2-2 3 2l1 4 1 1h4c1 1 1 1 1-2-1-3-1-3 2-2l4 2h7l5 1 1 2c-1 2 1 3 2 1 1-1 8-2 11-1h3c3-2 19 1 17 4l2 1 2 1 2 1-1-2c-2-3 1-3 3-1 4 4 18 4 21 1 2-3 3-3 6 0l3 2 1-3c0-3 1-4 2-4 4 0 11-9 11-13l1-3 1-2c0-4 6 1 7 6s3 9 4 9l1 1 2 4 2 3v-4c-1-4 2-7 7-6 4 1 4 1 4-3 1-4 1-4 3-4s3-1 1-2c-1-1 2-6 3-6l5-3 4-3c2 0 4-2 4-5s2-5 2-2l3 1c2 0 2 0 1-2l-1-3 1-4c0-4 0-4 4-6l4-1v3c0 4 3 6 3 2 0-2 0-3 1-2 1 2 2 1 2-3l1-5 3-5c1-6 1-6 6-5 2 1 2 1 3-2l4-4v3c-1 8-1 10-3 10l-6 6 3 1h2l3-3c3 0 3-1 3-3-1-9 13-15 20-9l2 2-1-6-2-7c-2-3-1-5 3-12s4-10 0-8h-4c-2-1-2-1-2 1l-1 2c-2-1-3 1-2 2 1 2 0 6-3 6l-2 4-1 3v-4c0-2 1-3 3-5s2-2 1-4c-2-2-2-3 0-4v-3h-3l-4 1c-5 0-8 2-8 5l-1 3-1 2-1 2-1-3c1-4-1-4-2 0v5l1 1-2 1c-2 0-3 1-3 2-1 2-1 2-1 0l4-11 1-5 1-3 3-2h-2c-1 0-2-1-2-5l-2-5c-1-1 0-2 2-4 2-3 3-3 6-3h2v-1l-2-1c-4 1-4 0-1-3l4-4c4 0 4 0 1 3-2 2-2 2-1 4 3 6 8 7 10 4 2-2 2-2 3-1h2l2-1c2 0 2-1 2-3 0-3 3-7 5-6h2l1-3h-1c-2 2-4 1-2-1 0-1 3-1 6 1h2l-1-2c-3-3 0-10 4-10l3-1-1-1c-3 1-2 0 0-6 2-4 4-5 3-2-1 2 0 2 1 2 2 0 2 0 1-1v-1c2-2 1-3-1-2l1-2c2-2 9-3 9-1l6 1 2 1 3 5 3 6c-1 1 0 2 1 2v2l-1 1h2c2 1 2 2-2 4-3 1-3 1-1 2s2 1 1 2c-3 2-2 3 0 2l2 1-1 1-1 1-3 2c-4 2-8 1-8-3l-2-4c-1-2-2-3-1-5 0-2-1-3-4-1h-3c-1-1-1 0-1 2s0 3-2 3l-2-1-3-1c-3 1-3 1-1 6 0 1-3 2-5 1-2-2-2-1-1 2s5 4 5 1h1l2-2 3-1c1 1 2 0 2-1 1-4 8-2 10 2 1 2 1 2-1 2-2-1-3 1-1 3l1 2 1 1 2 2c1 3 3 3 6 1v-2l-1-3 9 3-1 1-1 2v-1c0-3-1-2-3 0l-2 2h2c2 0 2 0 1 1l-4 3c-3 2-3 2-6 1-2-1-3-1-3 1l2 1 1 1 6 3c3-5 8-10 13-11l2-1v30h-3c-4 0-8-4-8-8 0-2 0-2-2-2h-4c-3-2-4 0-3 5v5c-1 2-6 5-8 5h-8l2 3v3c-2 2-1 3 1 3 6 0 9 10 4 17-2 4-2 6 1 4 2-3 4-2 6 0 1 2 2 2 3 1h6l2 1-3-4-3-2v-10c1-14 3-16 13-16h4v19l-1 19c-1-1-1 0-1 1s-1 2-4 2l-5-1-1-1-1 2-1 1c-2 0 0 5 2 7l2 1v8l1 1h-3l-4-2-2-1-4-3c-5-2-8-5-8-7l-1-1c-2 0-1 1 2 7 5 9 3 16-4 12-2-2-3-1 0 1l1 5 1 3c2 0 3 3 2 4l-1 2c1 2 0 2-3 2h-3l-1 2c-1 1 2 1 18 1h20V0H0v133m297-47l-1 4-3 4c-4 2-4 6 0 8 2 1 3 2 3 4 0 5 1 5 6 4h6c3 1 5 0 5-4 0-3 0-3 1-2 1 2 2 2 2 1v1l1 3 1 2c1 1 1 1 2-1 0-3 2-3 2 0l-1 2c-2 0 2 3 3 3l1-1v-2c2 0 1-3-2-5s-4-2-4 0c-1 1-1 1-1-1l2-2c1-1 1-1-1-3-2-1-2-1 0-1s1-3-2-5-4-3-4-5c0-4-3-6-6-4-2 1-3 2-5 0h-5M94 96c-5 2-6 12-1 16 3 3 11 3 11 0 0-2-1-2-4-2-5 0-7-2-6-8 1-3 3-4 7-3 3 0 3 0 3-2 0-3-5-4-10-1m14 0c-3 3-1 8 4 10 4 2 2 4-2 4-3-1-4 0-4 1-1 2 1 3 6 3 8 0 10-8 2-11-4-2-3-5 1-4 3 0 5-2 4-4-2-1-9-1-11 1m15 0c-3 2-2 7 2 10 5 2 5 4 0 4-3-1-4 0-4 1-1 4 8 4 11 1s1-8-4-10c-3-1-3-4 1-4 2 1 3 0 4-1 1-3-6-4-10-1m221 3l-1 3c-2 0-1 3 0 3 1 1 2 2 1 3l1 2 2-1 5-1 4-1h-2l-2-1 3-2c2 0 3-1 2-2 0-3-2-5-3-3 0 2-4 1-4-1s-1-2-3-2c-3 0-3 0-3 3m-77 15l-8 9-1 1-4 8-4 6-6-8c-8-11-11-11-4 0l7 9c0 2-4 9-6 10l-1 2-1 2c-2 1-4 4-4 6 0 3 3 0 7-5l6-9 2-2 6 8c5 8 8 11 8 8l-4-7-8-12c0-2 7-11 8-10l2 1-1-2c-1-1 2-8 4-8l1-1 5-8c7-9 4-8-4 2m-177 5c-2 2-3 2-3 20l1 22c2 5 3 5 24 5 17 0 19 0 21-2l3-2v-20l-1-23c-3-3-41-3-45 0m5 4c-2 0-2 0-2 19l1 18 13-13 15-13 4 4c5 4 5 4 5-5 0-11 0-11-18-11l-18 1m82 18l1 18c2 0 2-3 2-16l1-16 5 9c14 19 25 35 25 32 0-2-31-46-32-46-2 0-2 2-2 19m31 0v19h12c16-1 17-2 2-3h-11v-7c0-6 0-8 2-8h3l8-1 8-1-10-1h-11v-7l1-7h10l11-1c0-2-2-2-12-2h-13v19m57-18c1 2 1 2 8 2h5v17c0 13 1 17 2 18l1-17v-18h7c4 0 6-1 7-2l-15-1-15 1m-166 6c-3 4-1 10 4 10 3 0 4-1 6-4 3-6-6-11-10-6m13 21l-9 10h12c16 0 16 0 16-6 0-3-1-5-5-9l-5-4-9 9m261 11l-1 2c-1 0-10 8-10 10l-2 1-1 2c1 2-1 5-3 5-2-1-4 0-4 1s1 2 2 1c2 0 4 3 3 5v2l3-1 2-1c3 1 3-1 2-3-3-2-2-4 2-4l6-1c3-2 3-4 0-4-5 0-5-6-1-10 2-2 3-3 3-5h-1m-26 67l-3 2-4 2-7 1c-1 1-3 2-4 1l-9-1-4 1c-6 1-6 2-1 7s6 8 3 10h-5c-4 2 3 4 10 4 8 0 8-1 9-3 0-2 1-3 2-3l1-3c0-4 1-7 3-7a1292 1292 0 0 0 6-1c-1 1 0 2 1 3 3 2 4 2 2-1-3-3-2-5 2-4 3 0 4-1 2-4l-1-2c0-2-1-2-3-2M50 250l-1 2v5c0 4 0 5-2 5l-4 1-2 2v1l8 1c8 0 8 0 8-3v-3c-1-1-2-8 0-9v-2c-2-2-4-2-2 0v1l-1-1-2-1c-1-1-2 0-2 1' fill='lightgray' fill-rule='evenodd'/%3E%3C/svg%3E",src:"/static/NextJS-Tip-Using-Media-in-CSS-ec600eaa2f437b3b130a814e42204e6b-4e8db.jpg",srcSet:"/static/NextJS-Tip-Using-Media-in-CSS-ec600eaa2f437b3b130a814e42204e6b-7cc04.jpg 310w,\n/static/NextJS-Tip-Using-Media-in-CSS-ec600eaa2f437b3b130a814e42204e6b-69042.jpg 620w,\n/static/NextJS-Tip-Using-Media-in-CSS-ec600eaa2f437b3b130a814e42204e6b-4e8db.jpg 1240w,\n/static/NextJS-Tip-Using-Media-in-CSS-ec600eaa2f437b3b130a814e42204e6b-50ab1.jpg 1860w,\n/static/NextJS-Tip-Using-Media-in-CSS-ec600eaa2f437b3b130a814e42204e6b-e738f.jpg 1920w"}}},date:"09 July, 2018",tags:["nextjs","react","js","css","tips"],section:"blog"},fields:{slug:"/blog/2018/nextjs-tip-using-media-in-css/"}},relatedPosts:{edges:[{node:{html:'<p>Have you been developing a <a href="http://nextjs.org">NextJS</a> app with dynamic routing (using maybe Express), and found that every time you make a change you have to do the tedious process of shutting down the server (CTRL+C) and restarting it? (<code class="language-text">npm run dev</code>).</p>\n<p>If you\'re used to working with <a href="http://nodejs.org">NodeJS</a>, or <a href="https://expressjs.com/">ExpressJS</a>, you\'ve probably come across <a href="https://github.com/remy/nodemon">nodemon</a>. It\'s a utility that enables hot reloading on Node-based servers, so that whenever you make a change to a server file and save -- it instantly starts to restart without any prompt from your part.</p>\n<p>But <strong>nodemon doesn\'t work out of the box with NextJS</strong> and requires a <em>small amount</em> of configuration. If you try running nodemon without a config or the proper CLI params, you\'ll find that your server will start acting <em>real wonky</em>. My server started restarting infinitely, because it was detecting changes each time NextJS compiled, triggering an infinite loop of compilations.</p>\n<blockquote>\n<p>This guide assumes you have a NextJS project with dynamic routing setup. You can find a few in <a href="https://github.com/zeit/next.js/tree/master/examples">the examples section of the NextJS repo</a> </p>\n</blockquote>\n<h2>The solution?</h2>\n<p>Nodemon accepts a configuration file, which allows you have a greater degree of control over the process. By adding a few values to this file, we can solve all our issues.</p>\n<h3>Install nodemon</h3>\n<p>If you haven\'t already, install nodemon:</p>\n<p><code class="language-text">npm install --save-dev nodemon</code></p>\n<h3>Create the config file</h3>\n<p>Create a <code class="language-text">nodemon.json</code> file in the project root and paste the following into it:</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n    <span class="token property">"verbose"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token property">"ignore"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"node_modules"</span><span class="token punctuation">,</span> <span class="token string">".next"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">"watch"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"server/**/*"</span><span class="token punctuation">,</span> <span class="token string">"server.js"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token property">"ext"</span><span class="token operator">:</span> <span class="token string">"js json"</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>This tells nodemon to ignore the <code class="language-text">.next</code> folder, which is used as a cache for the Next compiler (and triggers the infinite reload). And we also tell it which file to watch for changes from. I keep my server file in a separate server folder, since I have stuff like routes/middleware/etc that need separate files and folders.</p>\n<h3>Update your npm dev script</h3>\n<p>Now you can modify your <code class="language-text">package.json</code> and update the \'dev\' script value to use nodemon instead of the default <code class="language-text">node server.js</code>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">  <span class="token string">"scripts"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">"dev"</span><span class="token punctuation">:</span> <span class="token string">"nodemon -w server/server.js server/server.js"</span><span class="token punctuation">,</span>\n    <span class="token string">"build"</span><span class="token punctuation">:</span> <span class="token string">"next build"</span><span class="token punctuation">,</span>\n    <span class="token string">"start"</span><span class="token punctuation">:</span> <span class="token string">"NODE_ENV=production node server.js"</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre>\n      </div>\n<p>Now you can run <code class="language-text">npm run dev</code> and you\'ll have yourself a hot-reloading server.</p>\n<p>I found this solution on <a href="https://github.com/zeit/next.js/issues/791">the NextJS Github issues</a>, where a people were having - go figure - the same issue.</p>\n<p>Hope that helps ✌️\nRyo</p>\n<hr>\n<p><strong>References</strong>:</p>\n<ul>\n<li><a href="https://github.com/remy/nodemon">nodemon</a></li>\n<li><a href="https://github.com/zeit/next.js/issues/791">NextJS Github issue - hot reloading</a></li>\n</ul>',frontmatter:{title:"NextJS Tip: Hot reloading for dynamic servers",cover_image:{publicURL:"/static/NextJS-Tips-Nodemon-1920px-6a346c8ffe4684585c23388268cc5d1f.jpg",childImageSharp:{sizes:{src:"/static/NextJS-Tips-Nodemon-1920px-6a346c8ffe4684585c23388268cc5d1f-4e8db.jpg",srcSet:"/static/NextJS-Tips-Nodemon-1920px-6a346c8ffe4684585c23388268cc5d1f-7cc04.jpg 310w,\n/static/NextJS-Tips-Nodemon-1920px-6a346c8ffe4684585c23388268cc5d1f-69042.jpg 620w,\n/static/NextJS-Tips-Nodemon-1920px-6a346c8ffe4684585c23388268cc5d1f-4e8db.jpg 1240w,\n/static/NextJS-Tips-Nodemon-1920px-6a346c8ffe4684585c23388268cc5d1f-50ab1.jpg 1860w,\n/static/NextJS-Tips-Nodemon-1920px-6a346c8ffe4684585c23388268cc5d1f-e738f.jpg 1920w"}}},date:"25 July, 2018",tags:["nextjs","express","js","es6","tips"]},fields:{slug:"/blog/2018/nextjs-tip-hot-reloading-for-dynamic-servers/"}}},{node:{html:'<p>Recently I needed to create a NextJS app that made authenticated API calls, and couldn\'t reveal it\'s credentials to the client. The solution was simple, I had to integrate Express into the app. But how do you fetch data from the API and pass it down to a page?</p>\n<blockquote>\n<p>This process assumes you have an environment setup with NextJS, Express, an isomorphic fetch solution, and dotenv (for ENV variables). If you follow the NextJS guide for dynamic routing you be mostly there. But it should be pretty easy to adapt to other server frameworks.</p>\n</blockquote>\n<h2>Async or bust</h2>\n<p>I tried to first fetch the data in a separate function and call it before the page was rendered in the route:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">const</span> credentials <span class="token operator">=</span> <span class="token punctuation">{</span>\n  method<span class="token punctuation">:</span> <span class="token string">\'get\'</span><span class="token punctuation">,</span>\n  headers<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">\'Content-Type\'</span><span class="token punctuation">:</span> <span class="token string">\'application/json\'</span><span class="token punctuation">,</span>\n    <span class="token string">\'Authorization\'</span><span class="token punctuation">:</span> <span class="token string">\'Basic \'</span> <span class="token operator">+</span> <span class="token function">btoa</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>API_USER <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>API_VENDOR<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">fetchApi</span> <span class="token punctuation">(</span>endpoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token function">fetch</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>API_URL <span class="token operator">+</span> endpoint<span class="token punctuation">,</span> credentials<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>r <span class="token operator">=></span> r<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n    server<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">\'/facilities\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token function">fetchApi</span><span class="token punctuation">(</span><span class="token string">\'/facilities/v1/\'</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token keyword">return</span> data<span class="token punctuation">)</span>\n\n      <span class="token keyword">return</span> app<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> <span class="token string">\'/facilities\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>This resulted in the page rendering and loading, and the data loading afterwards. Simple mistake, especially if you come from a background that isn\'t asynchronous. </p>\n<p>But how do you create an async Express route? Shockingly easily apparently:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js">    server<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">\'/facilities\'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetchApi</span><span class="token punctuation">(</span><span class="token string">\'/facilities/v1/\'</span><span class="token punctuation">)</span>\n            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token keyword">return</span> data<span class="token punctuation">)</span>\n\n      <span class="token keyword">return</span> app<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> <span class="token string">\'/facilities\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>Add an async before the function that renders your route -- *because don\'t stress it, it\'s easy to forget that you\'re working <strong>inside</strong> a function*. Now you just slap an await on Promise you want to fetch before page load.</p>\n<h2>But can we make it reusable?</h2>\n<p>I needed to fetch data across many routes, with many different requests to different endpoints. Rather than repeating code in every route to make the API request, we make a <strong>middleware</strong> that does it and dumps the data in the <code class="language-text">res.locals</code> (which is accessible in our route).</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token comment">// Credentials for authenticated fetch calls to API</span>\n<span class="token keyword">const</span> credentials <span class="token operator">=</span> <span class="token punctuation">{</span>\n  method<span class="token punctuation">:</span> <span class="token string">\'get\'</span><span class="token punctuation">,</span>\n  headers<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">\'Content-Type\'</span><span class="token punctuation">:</span> <span class="token string">\'application/json\'</span><span class="token punctuation">,</span>\n    <span class="token string">\'Authorization\'</span><span class="token punctuation">:</span> <span class="token string">\'Basic \'</span> <span class="token operator">+</span> <span class="token function">btoa</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>API_USER <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>API_VENDOR<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">/**\n * Facade for fetch preloaded with authentication credentials\n * to easily use in any other function\n */</span>\n<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fetchApi</span> <span class="token punctuation">(</span>endpoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span>API_URL <span class="token operator">+</span> endpoint<span class="token punctuation">,</span> credentials<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>r <span class="token operator">=></span> r<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">/**\n * A function that returns the middleware function\n * We nest the middleware in a function so we can \n * pass an endpoint, making the middleware more reusable\n */</span>\n<span class="token keyword">function</span> <span class="token function">getData</span><span class="token punctuation">(</span>endpoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    \n    <span class="token comment">/**\n     * Here we create an async function so\n     * we can load the data before the page renders\n     */</span>\n    <span class="token keyword">const</span> fetchData <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">await</span> <span class="token function">fetchApi</span><span class="token punctuation">(</span>endpoint<span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>\n          <span class="token comment">// We place the data in res.locals to access in the route later</span>\n          res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>data <span class="token operator">=</span> data\n          <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>        \n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\napp<span class="token punctuation">.</span><span class="token function">prepare</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> server <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    server<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">\'/facilities\'</span><span class="token punctuation">,</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token string">\'/facilities/v1/\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> app<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> <span class="token string">\'/facilities\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> data<span class="token punctuation">:</span> res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>data <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>The code explains it a bit, but I had to nest the middleware function inside another function in order to pass the endpoint parameter. It\'s the way that JS works, similar to when you use <code class="language-text">.map()</code> or <code class="language-text">.filter()</code> on an array and you want to pass a parameter but can\'t. It\'s an encapsulation issue caused by the way Express interprets it\'s middleware, forcing you to wrap it what the React community calls a "HOC", or a function that returns another function (so you can pass additional "props" to the child function - or component in React\'s case).</p>\n<p>Now in any route we simply add the middleware <code class="language-text">getData(endpoint)</code>.</p>\n<blockquote>\n<p>You could also just do a fetch in the middleware <strong>without the async</strong> and rely on <code class="language-text">next()</code> function in the promise chain. It\'ll hold the progress until the loading is complete and then provide the "next" function (usually the render function). I just left everything async just in case I refactor it out of the middleware.</p>\n</blockquote>\n<h3>Super middleware</h3>\n<p>You could take this middleware and apply it to the entire application (rather than a single route), and use the <code class="language-text">req.params</code> object to grab dynamic route variables (like a blog post ID, or in this case, a string that describes an endpoint). </p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> endpoint <span class="token operator">=</span> req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>endpoint\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    \n    <span class="token comment">/**\n     * Here we create an async function so\n     * we can load the data before the page renders\n     */</span>\n    <span class="token keyword">const</span> fetchData <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">await</span> <span class="token function">fetchApi</span><span class="token punctuation">(</span>endpoint<span class="token punctuation">)</span>\n        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>data <span class="token operator">=></span> <span class="token punctuation">{</span>\n          <span class="token comment">// We place the data in res.locals to access in the route later</span>\n          res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>data <span class="token operator">=</span> data\n          <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>        \n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">fetchData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n   <span class="token comment">// later in the app...</span>\n    server<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token string">\'/:endpoint\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> app<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">,</span> req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>endpoint<span class="token punctuation">,</span> <span class="token punctuation">{</span> data<span class="token punctuation">:</span> res<span class="token punctuation">.</span>locals<span class="token punctuation">.</span>data <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>This allows for a completely dynamic connection to whichever API you\'re using, so depending on how large (and preferably simple) it is to access, you can use <strong>one middleware to rule them all.</strong></p>\n<h2>I ❤️ middleware</h2>\n<p>Middleware makes life so much easier, and makes application code so much slimmer. If you can find a way to simplify this code (without getting too deep into ES6 land), I challenge you to post it up in the comments! I\'m always interested in discovering and sharing the most efficient solutions to common problems.</p>\n<p>Hope that helps! ✌️\nRyo </p>\n<hr>\n<p><strong>References</strong>:</p>\n<ul>\n<li><a href="https://expressjs.com/en/guide/using-middleware.html">ExpressJS Middleware</a></li>\n<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function">MDN: async function</a></li>\n<li><a href="https://hackernoon.com/middleware-the-core-of-node-js-apps-ab01fee39200">Middleware: THE core of node.js backend apps</a></li>\n<li><a href="https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016">Async Express routes</a></li>\n</ul>',
frontmatter:{title:"Express Middleware for API Requests",cover_image:{publicURL:"/static/Express-Middleware-for-API-Requests-1920px-52330e681ae16f3c2210acb276021f1b.jpg",childImageSharp:{sizes:{src:"/static/Express-Middleware-for-API-Requests-1920px-52330e681ae16f3c2210acb276021f1b-4e8db.jpg",srcSet:"/static/Express-Middleware-for-API-Requests-1920px-52330e681ae16f3c2210acb276021f1b-7cc04.jpg 310w,\n/static/Express-Middleware-for-API-Requests-1920px-52330e681ae16f3c2210acb276021f1b-69042.jpg 620w,\n/static/Express-Middleware-for-API-Requests-1920px-52330e681ae16f3c2210acb276021f1b-4e8db.jpg 1240w,\n/static/Express-Middleware-for-API-Requests-1920px-52330e681ae16f3c2210acb276021f1b-50ab1.jpg 1860w,\n/static/Express-Middleware-for-API-Requests-1920px-52330e681ae16f3c2210acb276021f1b-e738f.jpg 1920w"}}},date:"23 July, 2018",tags:["nextjs","express","js","api","es6","tips"]},fields:{slug:"/blog/2018/express-middleware-for-api-requests/"}}}]}},pathContext:{tag:"js",slug:"/blog/2018/nextjs-tip-using-media-in-css/"}}}});
//# sourceMappingURL=path---blog-2018-nextjs-tip-using-media-in-css-e59c9d7aabfb83c0851e.js.map