import { BaseDataService } from "../_core/baseDataService";
import { appConstant } from "../_core/appConstant";
import { User } from "../_models/userModel";


class UserDataService extends BaseDataService {
    public getUserInfo() {
        return this.get<User>(`${appConstant.apiUrl}/user/contact-info`);
    }
}
const userDataService = new UserDataService();
export default userDataService;