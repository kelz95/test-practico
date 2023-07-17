import https from 'https';

const getDataString = (url: string) => {
    return new Promise ((resolve, reject) => {
        const req = https.get(url, (res) => {
            if(res.statusCode !== 200){
                console.error(`Error al consumir api: ${res.statusCode}`);
                res.resume();
                return  reject(new Error('statusCode=' + res.statusCode));;
            }
            let data = [];
            res.on('data', (chunk) => {
                data.push(chunk);
                //data += chunk;
            });
            res.on('end', () => {
                try{
                    data = JSON.parse(Buffer.concat(data).toString());
                }catch(e){
                    reject(e);
                }
                resolve(data);
            });           
        });
        req.on('error', (err) => {
            console.error(`Error trying to make a request: ${err.message}`);
            reject(err.message);
        });
        req.end();
    });
}

export { getDataString }