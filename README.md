# Follow these steps to setup & run:

## 1. Setup
```bash
npm install
```

## 2. Bundle (if use bundled file in ./dist/index.js, can ignore this step)
```bash
npm run build 
```

## 3. Run
```bash
node ./dist/index.js --inputPath ./sample/overlapping.json --outputPath ./output/overlapping.optimal.json

# inputPath: the input json path
# outputPath: the output result path, in case it is empty, the default value is ./output/result.json
```

## 4. Run unit test
```bash
npm run test
```