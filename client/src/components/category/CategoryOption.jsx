import { useGetCategoryQuery } from "../../app/services/categoryApi";
import FormOption from "../../ui/options/FormOption";

const CategoryOption = ({ value, onChange }) => {
  const { data: categories = [], isLoading, isError } = useGetCategoryQuery();

  const categoryOptions = categories.map((category) => ({
    value: category.slug,
    label: category.name,
  }));

  return (
    <FormOption
      value={value}
      onChange={onChange}
      options={categoryOptions}
      loading={isLoading}
      error={isError}
      placeholder="Select a category"
    />
  );
};

export default CategoryOption;
