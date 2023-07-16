import { helpers } from "../../utils/helper/handlebar-util.mjs";
import { expect } from "chai";

describe('helpers', function() {
    describe('#dueDate_in_Days', function() {
        it('should return \'> 7 days ago\' when the date is more than 7 day ago', function() {
            let date = new Date()
            const result = helpers.dueDate_in_Days(date.setDate(date.getDate() - 8))
            expect(result).to.equal('> 7 days ago')
        })
        it('should return \'7 days ago\' when the date is exactly 7 days ago', function() {
            let date = new Date()
            const result = helpers.dueDate_in_Days(date.setDate(date.getDate() - 7))
            expect(result).to.equal('7 days ago')
        })
        it('should return \'a day ago\' when the date is exactly 1 day ago', function() {
            let date = new Date()
            const result = helpers.dueDate_in_Days(date.setDate(date.getDate() - 1))
            expect(result).to.equal('a day ago')
        })
        it('should return \'now\' when the date is today', function() {
            let date = new Date()
            const result = helpers.dueDate_in_Days(date.setDate(date.getDate()))
            expect(result).to.equal('now')
        })
        it('should return \'in a day\' when the date is exactly in 1 day', function() {
            let date = new Date()
            const result = helpers.dueDate_in_Days(date.setDate(date.getDate() + 1))
            expect(result).to.equal('in a day')
        })
        it('should return \'in 7 days\' when the date is exactly in 7 days', function() {
            let date = new Date()
            const result = helpers.dueDate_in_Days(date.setDate(date.getDate() + 7))
            expect(result).to.equal('in 7 days')
        })
        it('should return \'> 7 days\' when the date is more than 7 days in the future', function() {
            let date = new Date()
            const result = helpers.dueDate_in_Days(date.setDate(date.getDate() + 8))
            expect(result).to.equal('in > 7 days')
        })
    })
})
