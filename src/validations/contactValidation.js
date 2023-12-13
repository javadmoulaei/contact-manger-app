import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوداگی الزامی است."),
  photo: Yup.string()
    .url("آدرس معتبر نیست.")
    .required("تصویر مخاطب الزامی می‌باشد"),
  mobile: Yup.number().required("شماره موبایل الزامی است"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  job: Yup.string().nullable(),
  group: Yup.string().required("انتخاب گروه الزامی می‌باشد"),
});
