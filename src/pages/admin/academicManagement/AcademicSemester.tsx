import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { useGetAllSemestersQuery } from '../../../redux/features/admin/academicManagement.api';
import { TAcademicSemester } from '../../../types/academicManagement.type';
import { useState } from 'react';
import { TQueryParam } from '../../../types';

export type TTableData = Pick<
  TAcademicSemester,
  'name' | 'year' | 'startMonth' | 'endMonth'
>;

const AcademicSemester = () => {
 
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const [pagination, setPagination] = useState({ current: 1, pageSize: 2 });

  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery([
    ...(params || []),
    { name: 'page', value: pagination.current.toString() }, 
    { name: 'limit', value: pagination.pageSize.toString() },
  ]);

  
  // console.log(semesterData?.meta?.total);

  
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }) => ({
      key: _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      filters: [
        { text: 'Autumn', value: 'Autumn' },
        { text: 'Fall', value: 'Fall' },
        { text: 'Summer', value: 'Summer' },
      ],
    },
    {
      title: 'Year',
      key: 'year',
      dataIndex: 'year',
      filters: [
        { text: '2024', value: '2024' },
        { text: '2025', value: '2025' },
        { text: '2026', value: '2026' },
      ],
    },
    {
      title: 'Start Month',
      key: 'startMonth',
      dataIndex: 'startMonth',
    },
    {
      title: 'End Month',
      key: 'endMonth',
      dataIndex: 'endMonth',
    },
    {
      title: 'Action',
      key: 'x',
      render: () => <Button>Update</Button>,
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    paginationConfig,
    filters,
    _sorter,
    extra
  ) => {
    const { current, pageSize } = paginationConfig;

    // console.log(paginationConfig),
    // console.log(filters)
    // console.log(extra)
    // console.log(_sorter)

    if (extra.action === 'paginate') {
      setPagination({ current: current!, pageSize: pageSize! });
    }

    if (extra.action === 'filter') {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: 'name', value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: 'year', value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching} 
      columns={columns} 
      dataSource={tableData}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: semesterData?.meta?.total,
        showSizeChanger: true,
        pageSizeOptions: ['2', '4', '6', '8', '10'],
      }}
      onChange={onChange}
    />
  );
};

export default AcademicSemester;
