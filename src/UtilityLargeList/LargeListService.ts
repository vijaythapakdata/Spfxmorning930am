import {sp,ICamlQuery} from "@pnp/sp/presets/all";
import { ILargeListState } from "../webparts/largeList/components/ILargeListState";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class ServiceClassList{
    constructor(context:WebPartContext){
        sp.setup({
            spfxContext:context as any
        });
    }

// method to fetch data more than 5000 
public async getLargeListItems(ListName:string):Promise<ILargeListState[]>{
    const _allItems:ILargeListState[]=[];
    let position :any;
    do{
        const camlQuery:ICamlQuery={
            ViewXml:`
            <View>
            <Query>
            <Where>
            <IsNotNull>
            <FieldRef Name='Title'/>
            </IsNotNull>
            </Where>
            </Query>
            </View>
            `
        }
        //fetching items with pagination

        const response=await sp.web.lists.getByTitle(ListName).getItemsByCAMLQuery(camlQuery,position);
        console.log(`Fetched ${response.length} item from the list`);
        _allItems.push(...response.map((item:any)=>({
            Title:item.Title
        })));
    }
    while(position){
        console.log(`Fetching more items .... ${_allItems.length} items fetched so far`);
        return _allItems;
    }
}
}