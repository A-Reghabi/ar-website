# انتشار روی GitHub Pages با دامنهٔ reghabi.ir

این راهنما برای حساب GitHub با نام `A-Reghabi` و دامنهٔ `reghabi.ir` تنظیم شده است. GitHub Pages برای مخزن عمومی در پلن GitHub Free رایگان است. این سایت به هاست پولی، دیتابیس یا build نیاز ندارد. هزینهٔ تمدید دامنه جدا از میزبانی است. [مستندات GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## ۱. مخزن آمادهٔ سایت

فایل‌های سایت در ریشهٔ مخزن [A-Reghabi/ar-website](https://github.com/A-Reghabi/ar-website) قرار دارند. `index.html`، پوشهٔ `assets`، فایل‌های انیمیشن، عکس و PDF رزومه همراه سایت هستند. فایل `CNAME` شامل `reghabi.ir` است و `.nojekyll` برای انتشار مستقیم فایل‌ها اضافه شده است.

در حساب رایگان GitHub، مخزن باید Public باشد. نوع مخزن را در تنظیمات آن بررسی کنید. برای انتشار، مراحل بعد را در همین مخزن انجام دهید و مخزن دیگری نسازید.

## ۲. فعال کردن Pages

در Settings همین مخزن، بخش Pages را باز کنید.

- در Build and deployment، مقدار Source را روی `Deploy from a branch` بگذارید.
- شاخه را `main` و پوشه را `/ (root)` انتخاب کنید و Save را بزنید.
- در تب Actions وضعیت اجرای Pages را بررسی کنید. آماده‌شدن سایت ممکن است چند دقیقه طول بکشد.

آدرس پیش‌فرض این مخزن `https://a-reghabi.github.io/ar-website/` است. با دامنهٔ سفارشی، آدرس اصلی `https://reghabi.ir/` خواهد بود. هدف CNAME در DNS همچنان `a-reghabi.github.io` است و نباید نام مخزن به آن اضافه شود. [راهنمای منبع انتشار](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## ۳. تأیید مالکیت دامنه

GitHub تأیید دامنه را پیش از اتصال توصیه می‌کند. این مرحله در تنظیمات حساب است، نه تنظیمات مخزن.

1. روی عکس پروفایل GitHub کلیک کنید و Settings را باز کنید.
2. وارد Pages شوید و Add a domain را بزنید.
3. `reghabi.ir` را وارد کنید.
4. GitHub نام و مقدار یک رکورد TXT را نمایش می‌دهد.
5. در Cloudflare، دامنهٔ `reghabi.ir` را باز کنید و به DNS و سپس Records بروید.
6. یک رکورد TXT با نام و مقدار دقیق ارائه‌شده توسط GitHub بسازید. مقدار تأیید اختصاصی حساب شماست و در فایل‌های سایت وجود ندارد.
7. به GitHub برگردید و Verify را بزنید. ممکن است انتشار DNS تا ۲۴ ساعت طول بکشد.
8. رکورد TXT را نگه دارید تا مالکیت دامنه تأییدشده باقی بماند.

[راهنمای رسمی تأیید مالکیت](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)

## ۴. ثبت دامنه در مخزن

در Settings → Pages مخزن، در Custom domain مقدار `reghabi.ir` را وارد و Save کنید. این کار را قبل از تغییر رکوردهای آدرس‌دهی Cloudflare انجام دهید. فایل `CNAME` آماده است، ولی مقدار دامنه در تنظیمات Pages را هم بررسی کنید. [راهنمای دامنهٔ سفارشی](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

## ۵. رکوردهای Cloudflare

در Cloudflare، دامنهٔ `reghabi.ir` را انتخاب کنید و وارد DNS → Records شوید. این پنج رکورد را اضافه کنید. TTL را Auto بگذارید و Proxy status همهٔ آن‌ها را روی `DNS only`، یعنی ابر خاکستری، تنظیم کنید.

| Type | Name | Content | Proxy status |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | DNS only |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |
| CNAME | `www` | `a-reghabi.github.io` | DNS only |

مقدار CNAME را بدون `https://` و بدون مسیر یا نام مخزن بنویسید. چهار A record برای ریشهٔ دامنه و CNAME برای `www.reghabi.ir` هستند. با انتخاب `reghabi.ir` به‌عنوان دامنهٔ اصلی، GitHub آدرس www را به دامنهٔ اصلی هدایت می‌کند. [رکوردهای رسمی GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

برای این راه‌اندازی، DNS only را انتخاب می‌کنیم تا DNS آدرس‌های اصلی GitHub را برگرداند و HTTPS مستقیم توسط GitHub ارائه شود. ابر نارنجی باعث می‌شود DNS آدرس‌های واسط Cloudflare را برگرداند. این انتخاب برای ساده نگه داشتن اتصال اولیه است. [توضیح Proxy status در Cloudflare](https://developers.cloudflare.com/dns/proxy-status/)

اگر رکورد A، AAAA یا CNAME قبلی برای `@` یا `www` به هاست دیگری اشاره دارد، رکوردهای متعارض همان نام‌ها را اصلاح کنید. رکوردهای MX و TXT مربوط به ایمیل را نگه دارید. رکورد wildcard با نام `*` برای این سایت لازم نیست.

این تنظیمات فقط زمانی اثر دارند که Cloudflare ارائه‌دهندهٔ فعال DNS دامنه باشد. اگر وضعیت دامنه در Cloudflare هنوز Pending است، nameserverهای اختصاصی نمایش‌داده‌شده در Cloudflare را در پنل ثبت‌کنندهٔ دامنه یا ایرنیک تنظیم کنید و منتظر Active شدن دامنه بمانید. اگر اکنون Active است، nameserver را تغییر ندهید.

## ۶. فعال کردن HTTPS

1. پس از انتشار DNS به Settings → Pages مخزن برگردید.
2. منتظر موفق‌شدن بررسی DNS و صدور گواهی بمانید.
3. گزینهٔ Enforce HTTPS را فعال کنید. ممکن است تا ۲۴ ساعت طول بکشد تا در دسترس قرار گیرد.
4. `https://reghabi.ir` و `https://www.reghabi.ir` را در مرورگر باز کنید. هر دو باید به سایت برسند و www به دامنهٔ اصلی هدایت شود.

[HTTPS در GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

برای بررسی DNS در PowerShell ویندوز:

```powershell
Resolve-DnsName reghabi.ir -Type A
Resolve-DnsName www.reghabi.ir -Type CNAME
```

پاسخ اول باید چهار IP بالا و پاسخ دوم باید `a-reghabi.github.io` را نشان دهد. اگر خروجی متفاوت بود، nameserver فعال، رکوردهای متعارض و حالت DNS only را بررسی کنید.

## به‌روزرسانی‌های بعدی

هر تغییری را روی `main` ثبت کنید تا GitHub Pages دوباره منتشر کند. فایل `CNAME` را نگه دارید. اگر GitHub هنگام ثبت دامنه این فایل را تغییر داد، قبل از تغییرات بعدی نسخهٔ مخزن را دریافت کنید. برای تعویض عکس یا رزومه می‌توانید فایل جدید را با همان نام جایگزین کنید.

## خطاهای معمول

- خطای 404: `index.html` باید در ریشهٔ شاخهٔ انتخاب‌شده باشد و اجرای Pages در Actions موفق شده باشد.
- خطای DNS: چهار A record و CNAME را بررسی کنید. رکورد www باید به دامنهٔ GitHub اشاره کند.
- گزینهٔ HTTPS غیرفعال: برای صدور گواهی زمان بدهید و رکوردهای متعارض را بررسی کنید.
- نمایش نسخهٔ قدیمی: صفحه را با Ctrl+F5 باز کنید و آخرین اجرای Pages را بررسی کنید.

مرجع بررسی DNS و خطاهای گواهی، [راهنمای عیب‌یابی GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages) است.
