import { Injectable } from '@nestjs/common';
import { DbService } from '../database/db.service';

@Injectable()
export class DogService {
    constructor(
        // private readonly CatsService: CatsService,
        // private readonly AppService: AppService,
        private readonly dbService: DbService,
    ) {
    }

    // private readonly CatsService: CatsService;
    // private readonly AppService: AppService;
    // private DbService: DbService;
    //
    // constructor() {
    //     this.CatsService = new CatsService();
    //     this.AppService = new AppService();
    //     this.DbService = new DbService();
    // }

    // getDogs(): Cat[] {
    //     console.log(this.AppService.getHello());
    //     return this.CatsService.findAll();
    // }

    // 数据库链接测试
    async getDogList() {
        const data = await this.dbService.db
            .selectFrom('wm_user')
            .selectAll()
            .limit(10)
            .execute();
        console.log(data);
        return data;
    }
}
