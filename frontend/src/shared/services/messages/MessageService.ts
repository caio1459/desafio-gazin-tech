import Swal from "sweetalert2";

class MessageService {
  confirm(
    title: string,
    confirmMessage: string,
    onConfirm: () => void
  ): Promise<void> {
    return Swal.fire({
      title: title,
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onConfirm();
        Swal.fire({
          title: confirmMessage,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }
}

export default new MessageService();
