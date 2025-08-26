function formatMYR(num){ return 'RM' + Number(num).toFixed(2); }
function getParam(name){ const url = new URL(window.location.href); return url.searchParams.get(name); }
