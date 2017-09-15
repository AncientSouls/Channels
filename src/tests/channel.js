import complexFunctions from './channel/complexFunctions';
import basicFunctions from './channel/basicFunctions';
import adapter from './channel/adapter';

export default function () {
    describe('Class Channel:', () => {
        describe('Function check:', () => {
            adapter();
            basicFunctions();
            complexFunctions();
        });
    });
}