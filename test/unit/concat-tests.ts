// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { RecordBatch, Table, Vector, tableFromArrays, vectorFromArray } from 'apache-arrow';

describe(`Array.prototype.concat`, () => {
    const vector = vectorFromArray([1, 2, 3]);
    const table = tableFromArrays({ x: Int32Array.from([1, 2, 3]) });
    const batch = table.batches[0];

    test(`adds a Vector, a Table or a RecordBatch as one element`, () => {
        expect([0].concat(vector as any)).toEqual([0, vector]);
        expect([0].concat(table as any)).toEqual([0, table]);
        expect([0].concat(batch as any)).toEqual([0, batch]);
    });

    // Defining Symbol.isConcatSpreadable on any object, whatever its value,
    // turns off V8's fast Array.prototype.concat for the whole process.
    test(`finds no Symbol.isConcatSpreadable on the Arrow prototypes`, () => {
        for (const proto of [Vector.prototype, Table.prototype, RecordBatch.prototype]) {
            expect(Symbol.isConcatSpreadable in proto).toBe(false);
        }
    });
});
