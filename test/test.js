const test = require('ava')
const compare = require('../index')

test('strings (cat to cow)', t => {
  let result = compare('cat', 'cow')
  t.deepEqual(result, { equal: 1/3 })
})

test('strings (dog to dog)', t => {
  let result = compare('dog', 'dog')
  t.deepEqual(result, { equal: 1 })
})

test('strings (dogdogdog to dog)', t => {
  let result = compare('dogdogdog', 'dog')
  t.deepEqual(result, { equal: 1/3 })
})

test('strings (dog to dogdogdog)', t => {
  let result = compare('dog', 'dogdogdog')
  t.deepEqual(result, { equal: 1/3 })
})


test('numbers (1 to 3)', t => {
  let result = compare(1, 3)
  t.deepEqual(result, { equal: 0 })
})

test('numbers (100 to 97.3)', t => {
  let result = compare(100, 97.3)
  t.deepEqual(result, { equal: 0 })
})

test('numbers (100 to 99.125)', t => {
  let result = compare(100, 99.125)
  t.deepEqual(result, { equal: 0.125 })
})

test('numbers (99.125 to 100)', t => {
  let result = compare(99.125, 100)
  t.deepEqual(result, { equal: 0.125 })
})

test('numbers (10 to 10)', t => {
  let result = compare(10, 10)
  t.deepEqual(result, { equal: 1 })
})



test('objects (case 1)', t => {
  let a = { prop1: 10, prop2: 'aa' }
  let b = { prop1: 10, prop2: 'ab' }
  let result = compare(a, b)
  t.deepEqual(result, { equal: 0.75 })
})

test('objects (case 2)', t => {
  let a = {}
  let b = {}
  let result = compare(a, b)
  t.deepEqual(result, { equal: 1 })
})


test('objects (case 3)', t => {
  let a = { prop1: 10, prop2: 'aa' }
  let b = { prop1: 10, prop2: 'aa' }
  let result = compare(a, b)
  t.deepEqual(result, { equal: 1 })
})

test('objects (case 4)', t => {
  let a = { prop1: 10, prop2: { prop3: 20, prop4: 30 } }
  let b = { prop1: 10, prop2: 'aa' }
  let result = compare(a, b)
  t.deepEqual(result, { equal: 1/3 })
})

test('objects (case 5)', t => {
  let a = { prop1: 10, prop2: 'aa' }
  let b = { prop1: 10, prop2: { prop3: 20, prop4: 30 } }
  let result = compare(a, b)
  t.deepEqual(result, { equal: 1/3 })
})

test('objects (case 6)', t => {
  let a = { prop1: 10 }
  let b = { prop1: 10, prop2: { prop3: 20, prop4: 30 } }
  let result = compare(a, b, { ignoreExtraKeys: true })
  t.deepEqual(result, { equal: 1 })
})

test('objects (case 7)', t => {
  let a = { prop1: 10, prop2: { prop3: 'aa' } }
  let b = { prop1: 10, prop2: { prop3: 'ab', prop4: 30 } }
  let result = compare(a, b, { ignoreExtraKeys: true })
  t.deepEqual(result, { equal: 0.75 })
})
