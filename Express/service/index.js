
function Service()
{
    setTimeout(function ()
    {
        console.log("定时服务")
        Service();
    }, 3000)
}
Service();