import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
const qs = require('qs');


@Injectable()
export class FailAutomationEdge {
    constructor(
        private readonly httpService: HttpService
    ) { }

    /**
 * Retorna os processos fail AutomationEdge
 * @since 1.0.0
 * @author Weverton Manoel da Silva Filho
 * @version 1.0.0
 *
 * For example:
 * ```typescript 
 * failEdge() {
 *   
 * }
 * ```
 * @see [EM BREVE]
 *
 * @publicApi
 */
    public async failEdge(token: string, offset: number = 0): Promise<dataEdgeProps[]> {

        const requestB = {
            "filter": [{
                "columnName": "status",
                "displayName": "Status",
                "columnType": "string",
                "visibility": false,
                "comparator": "eq",
                "valueSet": ["New", "InProgress", "Complete", "Failure", "ExecutionStarted", "Unknown", "Retry", "Expired", "Diverted", "Terminated", "Resubmitted"],
                "values": ["Failure"],
                "error": {
                    "hasError": false,
                    "message": ""
                },
                "disabled": true
            }]
        };

        try {
            let { data } = await firstValueFrom(this.httpService.post(`${process.env.RPA_URL}/workflowinstances?offset=${offset}&size=100`,
                requestB,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-session-token': token
                    }
                }
            ))

            return data.data;
        } catch (error) {
            console.log('Error:', error.response ? error.response.data : error.message);
            throw new Error(error)
        }
    }

    public async awaitToken(): Promise<any> {
        console.log('PEGANDO TOKEN');

        const user = {
            username: process.env.RPA_USERNAME,
            password: process.env.RPA_PASSWORD
        };

        try {
            let { data } = await firstValueFrom(this.httpService.post(`${process.env.RPA_URL}/authenticate`,
                qs.stringify(user),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            ))

            return data.sessionToken
        } catch (error) {

            console.log('Error:', error.response ? error.response.data : error.message);
        }
    }

    public async filterDateEdge(): Promise<dataEdgeProps[]> {
        let token = await this.awaitToken();
        let edgeLoopData: dataEdgeProps[] = []
        let count = 0

        const d = new Date();
        d.setDate(d.getDate() - 30);

        while (true) {
            try {
                console.log(count, 'test');
                let k: dataEdgeProps[] = (await this.failEdge(token, count)).filter((value) => new Date(value.completedDate) >= d);
                if (!k.length) break;

                edgeLoopData.push(...k);
                count += 100
            } catch (error) {
                console.log(count, error.message);

                token = await this.awaitToken();
                continue
            }
        }

        console.log(edgeLoopData.length);
        
        return edgeLoopData
    }
}