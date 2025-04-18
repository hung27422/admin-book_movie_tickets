import snacksServices from "@/services/snackServices";
import { ISnack } from "@/types/Snack";
import useSWR from "swr";

interface UseSnackProps {
  cinemaId?: string;
  name?: string;
}

function useSnacks({ name }: UseSnackProps = {}) {
  // Lấy tất cả snacks theo cinemaId
  const { data: snacks, error, mutate } = useSWR<ISnack[]>("/snacks");

  // Lấy snacks theo tên (search)
  const { data: dataSnackByName } = useSWR<ISnack[]>(name && `/snacks/search?name=${name}`);

  const addSnack = async (snack: ISnack) => {
    try {
      const newSnack = await snacksServices.addSnack(snack);
      mutate(); // cập nhật lại danh sách
      console.log("Snack mới:", newSnack);
      return newSnack;
    } catch (error) {
      console.error("Lỗi khi thêm snack:", error);
      throw error;
    }
  };

  const updateSnack = async (id: string, snack: ISnack) => {
    try {
      const updated = await snacksServices.updateSnack(id, snack);
      mutate();
      console.log("Snack đã cập nhật:", updated);
      return updated;
    } catch (error) {
      console.error("Lỗi khi cập nhật snack:", error);
      throw error;
    }
  };

  const deleteSnack = async (id: string) => {
    try {
      await snacksServices.deleteSnack(id);
      mutate();
    } catch (error) {
      console.error("Lỗi khi xóa snack:", error);
      throw error;
    }
  };

  return {
    snacks,
    dataSnackByName,
    error,
    addSnack,
    updateSnack,
    deleteSnack,
  };
}

export default useSnacks;
