// https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript/39000004#39000004


// mapReduce = (a -> b, (b,a) -> b, (b,a) -> b)
const mapReduce = (m,r) =>
  (acc,x) => r (acc, m (x))

// flatMap :: (a -> [b]) -> [a] -> [b]
const flatMap = f => xs =>
  xs.reduce (mapReduce (f, concat), [])

// concat :: ([a],[a]) -> [a]
const concat = (xs,ys) =>
  xs.concat (ys)

// id :: a -> a
const id = x =>
  x

// flatten :: [[a]] -> [a]
const flatten =
  flatMap (id)
  
// deepFlatten :: [[a]] -> [a]
const deepFlatten =
  flatMap (x =>
    Array.isArray (x) ? deepFlatten (x) : x)

// your sample data
const data =
  [ [ [ 1, 2 ],
      [ 3, 4 ] ],
    [ [ 5, 6 ],
      [ 7, 8 ] ] ]

console.log (flatten (data))
// [ [ 1. 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ] ]

console.log (deepFlatten (data))
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]

