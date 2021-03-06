const os = require('os');
const cron = require('node-cron');

cron.schedule('* * * * *', () => {
    //cpus is all cores, we need the average of all the cores which 
    //will give us the cpu average

    function cpuAverage() {
        const cpus = os.cpus();

        let idleMs = 0;
        let totalMs = 0;
        cpus.forEach((aCore) => {
            for (type in aCore.times) {
                totalMs += aCore.times[type];
            }
            idleMs += aCore.times.idle;

        });
        return {
            idle: idleMs / cpus.length,
            total: totalMs / cpus.length
        }
    }


    const start = cpuAverage();
    let percentageCpu = 0;
    setTimeout(() => {
        const end = cpuAverage();
        const idleDifference = end.idle - start.idle;
        const totalDifference = end.total - start.total;

        //cal percentage cpu usuage
        percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference);
        console.log(percentageCpu);
        //PM2 or forever will help it  to start kindly install in your system to make it work
        if (percentageCpu > 70)
            process.exit(1);

    }, 100)




});

