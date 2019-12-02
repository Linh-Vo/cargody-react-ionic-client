import { BaseDataService } from "../_core/baseDataService";
import { appConstant } from "../_core/appConstant";
import { User } from "../_models/userModel";


class UserDataService extends BaseDataService {
    public getUserInfo() {
        return this.get<User>(`${appConstant.apiUrl}/user/contact-info`);
    }

    public updateUserInfo(editUserModel: User) {
        return this.put<User>(`${appConstant.apiUrl}/user/contact-info`,
            editUserModel);
    }
}
const userDataService = new UserDataService();
export default userDataService;