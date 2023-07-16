import { expect } from "chai";
import { noteEntryStore } from "../../services/note-entry-store.mjs";

describe('noteEntry-store', function() {
    describe('#orderDirection', function() {
        it('should return \'1\' when first parameter is before second parameter', function() {
            const result = noteEntryStore.orderLogic('A', 'B')
            expect(result).to.equal(1)
        })
        it('should return \'-1\' when first parameter is after second parameter', function() {
            const result = noteEntryStore.orderLogic('B', 'A')
            expect(result).to.equal(-1)
        })
    })
})
