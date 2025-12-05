import { Injectable } from '@nestjs/common';
import {hashSync, compareSync} from 'bcrypt';
const salt = 10;
@Injectable()
export class HashingService {
    hashData(data:string):string{
        return hashSync(data, salt);
    }

    compare(value: string, hashedData:string):boolean{
        return compareSync(value, hashedData);
    }
}
