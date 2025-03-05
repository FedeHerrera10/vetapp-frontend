type ErrorProp = {
  message: string | null;
};

export const MessageError = ({ message}: ErrorProp) => {
  if(message == null || message.trim().length == 0 ){
    return(
      <p className="h-2 my-1"></p>
    )
  }

  return(
    <p className="my-1 ml-1 h-2 text-red-500 text-[13px]  ">{message}</p>
  )
}