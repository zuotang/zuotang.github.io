(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{135:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(12),i=a(156),s=a.n(i),l=a(145),m=a.n(l),u=a(171),o=a.n(u),g=a(165),p=a.n(g),f=a(168),E=a(169),d=a(170),b=a(27),w=a(200),h=a(40),v=a.n(h),k=a(133),x={categories:"分类",archive:"归档",tag:"标签"};t.default=Object(c.withStyles)(function(e){return{mainGrid:{marginTop:3*e.spacing.unit},post:{marginTop:1.5*e.spacing.unit,marginBottom:1.5*e.spacing.unit}}})(function(e){var t=Object(n.useContext)(b.a),a=Object(n.useContext)(k.FrameContext),c=e.classes,i=e.match.params,l=i.name,u=i.value;Object(n.useEffect)(function(){a.setTitle(x[l])},[l]);var g=t.list;if(l&&u)switch(l){case"categories":g=t.list.filter(function(e){return e.categories&&e.categories.includes(u)});break;case"archive":g=t.list.filter(function(e){return v()(e.date).format("YYYY-MM")==u});break;case"tag":g=t.list.filter(function(e){return e.tags&&e.tags.includes(u)})}return r.a.createElement(f.a,null,r.a.createElement(s.a,null),r.a.createElement("main",null,r.a.createElement(o.a,{container:!0,spacing:40,className:c.mainGrid},r.a.createElement(o.a,{item:!0,xs:12,md:10},r.a.createElement(m.a,{variant:"h4",gutterBottom:!0},u||"文章"),r.a.createElement(p.a,null),g.map(function(e,t){return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement(E.a,{post:e,className:c.post}),r.a.createElement(p.a,null))})),r.a.createElement(o.a,{item:!0,xs:12,md:2},r.a.createElement(w.a,{replace:!0})))),r.a.createElement(d.a,null))})}}]);