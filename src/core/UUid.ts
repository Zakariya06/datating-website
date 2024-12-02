import { v4 } from 'uuid';

export class UUid {
    public static generate() {
        return v4();
    }
}
export default UUid;
