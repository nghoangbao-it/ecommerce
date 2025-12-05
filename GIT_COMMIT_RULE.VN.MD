Dưới đây là một **mẫu README về các tiền tố commit Git** mà bạn có thể đưa vào dự án để mọi người thống nhất cách đặt commit message:

---

# Git Commit Message Prefixes

Để giữ cho lịch sử commit rõ ràng, dễ đọc và dễ theo dõi, dự án này sử dụng các **tiền tố commit (commit prefixes)**.

## **Danh sách tiền tố**

| Tiền tố    | Mục đích                                                   | Ví dụ                                        |
| ---------- | ---------------------------------------------------------- | -------------------------------------------- |
| `feat`     | Thêm tính năng mới                                         | `feat: thêm chức năng đăng ký bằng Google`   |
| `fix`      | Sửa lỗi                                                    | `fix: sửa lỗi không gửi được email xác nhận` |
| `docs`     | Chỉ chỉnh sửa tài liệu                                     | `docs: cập nhật README`                      |
| `style`    | Chỉ định dạng code, không thay đổi logic                   | `style: format lại file userService.ts`      |
| `refactor` | Thay đổi code nhưng không thêm tính năng hoặc sửa lỗi      | `refactor: tách module auth thành 2 file`    |
| `perf`     | Cải thiện hiệu năng                                        | `perf: tối ưu truy vấn database`             |
| `test`     | Thêm hoặc sửa test                                         | `test: thêm unit test cho UserService`       |
| `chore`    | Các công việc không liên quan logic/code như config, build | `chore: cập nhật version dependencies`       |
| `ci`       | Cập nhật config CI/CD                                      | `ci: cấu hình pipeline GitHub Actions`       |
| `revert`   | Hoàn tác commit trước đó                                   | `revert: revert commit 123abcd`              |

---

## **Quy tắc đặt commit**

1. Sử dụng **tiền tố phù hợp**.
2. Viết **tiêu đề commit ngắn gọn, dưới 50 ký tự**, viết thường.
3. Nếu cần thêm chi tiết, viết **mô tả commit sau dòng trống** (không bắt buộc).

**Ví dụ đầy đủ:**

```
feat: thêm chức năng reset mật khẩu

- Thêm API gửi email reset
- Thêm validation token reset
- Cập nhật test cho endpoint reset
```

---

Mình có thể tạo thêm **phiên bản Markdown đẹp, có color highlight bảng và note hướng dẫn tiếng Việt + tiếng Anh** để đọc dễ hơn, nếu muốn bạn chỉ cần dùng trực tiếp trong repo.

Bạn có muốn mình tạo luôn phiên bản đó không?
