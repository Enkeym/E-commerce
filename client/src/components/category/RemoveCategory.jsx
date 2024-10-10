
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useRemoveCategoriesMutation } from '../../app/services/categoryApi'

const RemoveCategory = ({ id }) => {
  const [removeCategory] = useRemoveCategoriesMutation()
  const handleRemoveCategory = async () => {
    await removeCategory(id).unwrap()
    toast.success('Removed successfully')
  }


  return (
    <Button variant="danger" onClick={handleRemoveCategory}>X</Button>
  )
}


export default RemoveCategory