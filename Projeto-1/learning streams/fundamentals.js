import { Readeble } from 'node:stream'

class OneToHundredStream extends Readeble{
    index = 1
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else{
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 500)
    }
}

new OneToHundredStream()
    .pipe(process.stdout)