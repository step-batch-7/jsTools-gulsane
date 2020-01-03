#!/bin/bash

cat <<EOF > .git/hooks/pre-commit  
npx eslint src test *.js && mocha && npm run appTests
if [ \$? != 0 ]; then 
    exit 1
fi
EOF


chmod +x .git/hooks/pre-commit  

cat <<EOF > .git/hooks/pre-push  
npx eslint src test *.js && mocha && npm run appTests
if [ \$? != 0 ]; then 
    exit 1
fi
EOF


chmod +x .git/hooks/pre-push