const {
    Scalar,
    utils
} = require('ffjavascript');

const snarkjs = require('snarkjs');

const buildBabyjub = require('circomlibjs').buildBabyjub();

const buildPedersenHash = require('circomlibjs').buildPedersenHash();

const {
    leInt2Buff,
    array2buffer,
    unstringifyBigInts
} = utils;

const privateKey = '0xa3a0cc60db27052a4c65063c2a007dec8ac011e21e562d0cdef7bc4aebc6960c';

async function main() {
    const pedersenHash = await buildPedersenHash;
    const babyjub = await buildBabyjub;

    const msg = (new TextEncoder()).encode("Hello");
    const msg2 = (new TextEncoder()).encode(privateKey);

    function buff2hex(buff) {
        function i2hex(i) {
            return ('0' + i.toString(16)).slice(-2);
        }
        return Array.from(buff).map(i2hex).join('');
    }
    // const buff512 = (buf) => {
    //     const newBuf = Buffer.alloc(64);

    //     for (let i = 0; i < 64; i += 1) {
    //         if (buf[i]) {
    //             newBuf[i] = buf[i];
    //         } else {
    //             newBuf[i] = 0;
    //         }
    //     }

    //     return newBuf;
    // };
    // const hasher = async (msg) => {
    //     await buildPedersenHash.then((some) => {
    //         some.hash(msg)
    //     })
    // }
    // hasher(privateKey);
    // function buf2hex(buffer) { // buffer is an ArrayBuffer
    //     return "0x" + [...new Uint8Array(buffer)]
    //         .map(x => x.toString(16).padStart(2, '0'))
    //         .join('');
    // }

    // const pri = Buffer.concat([Uint8Array.from(privateKey)]);
    // const pri2 = Buffer.from(privateKey);
    const input = '13516464634170510868514990663234703921658499834568172703840598274622696969987';
    const inputBuffer = Buffer.concat([Uint8Array.from(input)]);
    const inputBuffer2 = Buffer.from(input);

    const hashedPri1 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(input))[0]);
    const hashedPri2 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(inputBuffer))[0]);
    const hashedPri3 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(inputBuffer2))[0]);
console.log('hashedPri1:', hashedPri1);
console.log('hashedPri2:', hashedPri2);
console.log('hashedPri3:', hashedPri3);
    // console.log('dasasccxz', buff2hex(pedersenHash.hash(msg)))
    // const hello = '0';
    // const {proof, publicSignals} = await snarkjs.groth16.fullProve({
    //         in: hello
    //     },
    //     './circuit/multiplier2_js/multiplier2.wasm',
    //     'multiplier2_0001.zkey').finally((Hello) => Hello);
    // console.log('publicSignals:', publicSignals)
    // const hashedPri = babyjub.unpackPoint(pedersenHash.hash(input))[0];
    // const hashedPri = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash('0'))[0]);
    // const hashedPri11 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash('0'))[1]);
    // const hashedPri12 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash('0')));
    // const hashedPri2 = babyjub.F.toObject(pedersenHash.hash('0'));
    // const hashedPri3 = babyjub.F.toObject(pedersenHash.hash(buff2hex('0')));
    // const hashedPri4 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(buff2hex('0')))[0]);
    // const hashedPri41 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(buff2hex('0')))[1]);
    // const hashedPri42 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(buff2hex('0'))));
    // const ahashedPri = pedersenHash.hash(input);
    // const hashedPri2 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(inputBuffer))[0]);
    // const ahashedPri2 = babyjub.F.toObject(pedersenHash.hash(inputBuffer));
    // const hashedPri3 = babyjub.F.toObject(pedersenHash.hash(inputBuffer2))[0];
    // const ahashedPri3 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(inputBuffer2))[0]);
    // const hashedPri4 = babyjub.F.toObject(pedersenHash.hash(leInt2Buff(Scalar.fromString(input))))[0];
    // const ahashedPri4 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(leInt2Buff(Scalar.fromString(input)))));
    // const hashedPri5 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(leInt2Buff(Scalar.fromString(inputBuffer))))[0]);
    // const hashedPri6 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(leInt2Buff(Scalar.fromString(inputBuffer2))))[0]);
    // const hashedpri3BufferPri3 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(buff512(pri3Buffer)))[0]);
    // const hashedpri3BufferPri5 = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(buff512(pri3Buffer5)))[0]);
    // const hashedPrivatekey = babyjub.F.toObject(babyjub.unpackPoint(pedersenHash.hash(privateKey))[0]);
    // console.log('pri:', hashedPri);
    // console.log('pri:', hashedPri11);
    // console.log('pri:', hashedPri12);
    // console.log('pri2:', hashedPri2);
    // console.log('pri3:', hashedPri3)
    // console.log('hashedPri4:', hashedPri4)
    // console.log('hashedPri4:', hashedPri41)
    // console.log('hashedPri4:', hashedPri42)
    // console.log('ahashedPri:', ahashedPri);
    // console.log('ahashedPri2:', ahashedPri2);
    // console.log('ahashedPri3:', ahashedPri3)
    // console.log('ahashedPri4:', ahashedPri4)
    // console.log('hashedPri5:', hashedPri5)
    // console.log('hashedPri6:', hashedPri6)
    // console.log('pri3Buffer:', hashedpri3BufferPri3)
    // console.log('pri3Buffer5:', hashedpri3BufferPri5)
    // console.log('privateKey:', hashedPrivatekey);
}

main().then(() => process.exit);