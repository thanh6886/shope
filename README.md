# Ts_BASE

Pagination

Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page

3 trường hợp

TH1:
[1] 2 3 ... 19 20

1 [2] 3 4 ... 19 20

1 2 [3] 4 5 ... 19 20

1 2 3 [4] 5 6 ... 19 20

1 2 3 4 [5] 6 7 ... 19

# code

if (page <= 5 && pageIndex > page + 2 && pageIndex < pageSize - 2 - 1) {
if (!dot) {
dot = true
return <button className='bg-white rounded px-3 py-2 shadow-sm  mx-2 cursor-pointer'>...</button>
}
return
}

# TH2

1 2 ... 4 5 [6] 7 8 ... 19 20

1 2 ...13 14 [15] 16 17 ... 19 20

# TH3

1 2 ... 14 15 [16] 17 18 19 20
1 2 ... 15 16 [17] 18 19 20
1 2 ... 16 17 [18] 19 20
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
