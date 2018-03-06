'use strict';

const licenseText = `/**
 * (C) Copyright IBM Corp. 2018 All Rights Reserved
 */`;

module.exports = function(fileInfo, api, options) {
  const j = api.jscodeshift;
  const annotatedSource = licenseText + '\n\n' + fileInfo.source;
  return j(annotatedSource).toSource();
};
