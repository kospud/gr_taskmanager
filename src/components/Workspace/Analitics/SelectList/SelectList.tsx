
import { StringDecoder } from "string_decoder";
import { UserListItemState, projectListItemState } from "../../../../types/types";
import './SelectList.css'

type Item = UserListItemState | projectListItemState

interface SelectListProps {
    items: Item[]
    currentId: number,
    title: string
    setCurrentId: (id: number) => void
}

const SelectList: React.FC<SelectListProps> = ({ items, currentId, title, setCurrentId }) => {

    return (
        <div className="selectList">
            <div className="selectListTitle">{title}</div>
            {items.map(item => <SelectListItem item={item}
                currentId={currentId}
                setCurrentId={setCurrentId}
            />)}
        </div>
    )

}

interface SelectListItemProps {
    item: Item
    currentId: number,
    setCurrentId: (id: number) => void
}

const SelectListItem = ({ item, currentId, setCurrentId }: SelectListItemProps) => {

    return (
        <div className={`selectListItem ${currentId === getItemId(item) && 'selected'}`} onClick={() => setCurrentId(getItemId(item))}>
            <span>{getItemName(item)}</span>
        </div>
    )

    function getItemName(item: Item) {
        if ('userName' in item) {
            return item.userName
        } else {
            return item.projectName
        }
    }

    function getItemId(item: Item) {
        if ('userName' in item) {
            return item.userID
        } else {
            return item.projectID
        }
    }
}


export default SelectList
