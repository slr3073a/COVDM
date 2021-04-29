import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable, Subject} from "rxjs"
import {TestCenter} from "./models/testcenters.model"
import {GetTestCenterResponse} from "./models/http/GET-testcenter.model"

@Injectable({
    providedIn: "root"
})
export class TestCenterService {

    private _testCenters: TestCenter[] = []
    private _testCentersUpdated: Subject<TestCenter[]> = new Subject<TestCenter[]>()

    constructor(private http: HttpClient) {
    }

    fetchTestCenters(callback: () => void): void {
        this.http.get<GetTestCenterResponse[]>("http://localhost:4000/getTestCenters")
            .subscribe((data: GetTestCenterResponse[]) => {
                let tmp: TestCenter[] = []
                for (const testCenter of data) {
                    const tempis: TestCenter = {
                        _id: testCenter._id,
                        rs: testCenter.rs,
                        adresse: testCenter.adresse,
                        check_rdv: testCenter.check_rdv,
                        do_antigenic: testCenter.do_antigenic,
                        do_prel: testCenter.do_prel,
                        horaire: testCenter.horaire,
                        latitude: testCenter.latitude,
                        longitude: testCenter.longitude,
                        mod_prel: testCenter.mod_prel,
                        public: testCenter.public,
                        tel_rdv: testCenter.tel_rdv,
                    }
                    tmp.push(tempis)
                }
                this._testCenters = [...tmp]
                this._testCentersUpdated.next(this._testCenters)
                callback()
            })

    }

    get testCenterObservable(): Observable<TestCenter[]> {
        return this._testCentersUpdated.asObservable()
    }
}