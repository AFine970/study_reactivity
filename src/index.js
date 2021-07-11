// 主函数
import observe from './observe'
import Watch from './Watch'

let obj = {
    a: {
        m: {
            n: 5
        }
    },
    b: 10,
    c: {
        d: {
            e: {
                f:666
            }
        }
    }, 
    g: [22, 33, 44, 55]
}

// observe(obj)

// obj.g.push(66)
// console.log('g', obj.g);

// obj.g.unshift(66)
// console.log('g', obj.g);

// obj.g.splice(2, 1, 88, 99)
// console.log('g', obj.g);

// obj.g = 66
// console.log('g', obj.g);

observe(obj)
new Watch(obj, 'a.m.n', (value) => {
    console.log('☆☆☆☆☆', value)
})
// obj.a.m.n = 88
// console.log(obj)