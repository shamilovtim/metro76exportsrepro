import React from 'react';
import {View} from 'react-native';
import {
  DataStoreLevel,
  DataStream,
  DidKeyResolver,
  Dwn,
  Jws,
  MessageStoreLevel,
} from '@tbd54566975/dwn-sdk-js';
import {AbstractLevelRN} from './abstractLevelRN';
import crypto from 'crypto';

let dwn: Dwn;

async function initDwn() {
  // debugger;
  if (!dwn) {
    dwn = await Dwn.create({
      messageStore: new MessageStoreLevel({
        createLevelDatabase: () => new AbstractLevelRN('messageStore') as any,
      }),
      dataStore: new DataStoreLevel({
        createLevelDatabase: () => new AbstractLevelRN('dataStore') as any,
      }),
    });
  }

  return dwn;
}

async function testDwn() {
  const didKey = await DidKeyResolver.generate(); // generate a did:key DID
  const signatureMaterial = Jws.createSignatureInput(didKey);
  const data = crypto.randomBytes(32); // in node.js

  // console.log(didKey);
  // const signatureMaterial = Jws.createSignatureInput(didKey);

  // const recordsWrite = await RecordsWrite.create({
  //   data: dataBytes,
  //   dataFormat: 'application/json',
  //   authorizationSignatureInput: signatureMaterial,
  // });

  // const result = await dwn.processMessage(
  //   didKey.did,
  //   recordsWrite.message,
  //   dataStream,
  // );

  // console.log(result.status);

  // const recordsQuery = await RecordsQuery.create({
  //   filter: {recordId: recordsWrite.message.recordId},
  //   authorizationSignatureInput: signatureMaterial,
  // });
  // const replyResult = await dwn.processMessage(
  //   didKey.did,
  //   recordsQuery.message,
  // );
  // console.log(replyResult.status);
}

testDwn();

export const DwnComponent = () => {
  return <View></View>;
};
