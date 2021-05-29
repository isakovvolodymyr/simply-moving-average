import {Item} from '@app/commons/response/item';

export default class ApiResponse {
    public static json<ViewModel>(viewModel: ViewModel): Item<ViewModel> {
        return new Item<ViewModel>(viewModel);
    }
}
